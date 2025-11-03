# @filipgorny/logger

Shared logging package with strategy pattern for flexible log output.

## Features

- **Strategy pattern** - Easily switch between logging strategies
- **Type-safe** - Full TypeScript support
- **Multiple log levels** - DEBUG, INFO, WARN, ERROR
- **Contextual logging** - Add metadata to logs
- **Child loggers** - Create loggers with inherited context
- **Colorized console output** - Better readability in development
- **Future-ready** - Prepared for Datadog integration

## Installation

```bash
# In the monorepo, this package is automatically available
pnpm add @filipgorny/logger
```

## Usage

### Basic Usage

```typescript
import { createLogger, LogLevel } from '@filipgorny/logger'

const logger = createLogger('my-service', LogLevel.INFO)

logger.info('Server started', { port: 3000 })
logger.warn('High memory usage', { usage: '85%' })
logger.error('Database connection failed', error, { retries: 3 })
```

### Custom Strategy

```typescript
import { Logger, LogLevel, DatadogLogStrategy } from '@filipgorny/logger'

const logger = new Logger({
  service: 'my-service',
  level: LogLevel.INFO,
  strategy: new DatadogLogStrategy(process.env.DATADOG_API_KEY!)
})

logger.info('Using Datadog strategy')
```

### Child Loggers

```typescript
const logger = createLogger('api-service')
const requestLogger = logger.child({ requestId: '123', userId: 'abc' })

requestLogger.info('Processing request') // Includes requestId and userId
```

### Switching Strategies

```typescript
import { ConsoleLogStrategy, DatadogLogStrategy } from '@filipgorny/logger'

// Start with console
logger.setStrategy(new ConsoleLogStrategy())

// Switch to Datadog in production
if (process.env.NODE_ENV === 'production') {
  logger.setStrategy(new DatadogLogStrategy(process.env.DATADOG_API_KEY!))
}
```

## API

### `createLogger(serviceName, level?)`

Create a new logger instance.

- `serviceName`: Name of the service (e.g., 'llm-service')
- `level`: Minimum log level (default: LogLevel.INFO)

### Logger Methods

- `debug(message, context?)` - Debug level logging
- `info(message, context?)` - Info level logging
- `warn(message, context?)` - Warning level logging
- `error(message, error?, context?)` - Error level logging
- `child(context)` - Create a child logger with inherited context
- `setStrategy(strategy)` - Change the logging strategy
- `setLevel(level)` - Change the minimum log level

## Strategies

### ConsoleLogStrategy (Default)

Logs to console with colorized output.

### DatadogLogStrategy (Coming Soon)

Sends logs to Datadog HTTP API.

### Custom Strategy

Implement the `LogStrategy` interface:

```typescript
import { LogStrategy, LogEntry } from '@filipgorny/logger'

class MyCustomStrategy implements LogStrategy {
  log(entry: LogEntry): void {
    // Your custom logging logic
  }
}
```

## Log Levels

- `DEBUG` - Detailed debugging information
- `INFO` - General informational messages
- `WARN` - Warning messages
- `ERROR` - Error messages

## Example Output

```
2025-10-28T21:00:00.123Z [llm-service] INFO  | Server started { port: 3003 }
2025-10-28T21:00:05.456Z [llm-service] WARN  | High memory usage { usage: '85%' }
2025-10-28T21:00:10.789Z [llm-service] ERROR | Database connection failed { retries: 3 }
```
