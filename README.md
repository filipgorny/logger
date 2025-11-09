# @filipgorny/logger

Lightweight, colorful logging package with strategy pattern for flexible log output.

## Features

- **Strategy pattern** - Easily switch between logging strategies
- **Type-safe** - Full TypeScript support
- **Multiple log levels** - DEBUG, INFO, WARN, ERROR
- **Contextual logging** - Add metadata to logs
- **Child loggers** - Create loggers with inherited context
- **Colorized console output** - Beautiful, readable logs with custom colors
- **Test-friendly** - Automatically suppresses error logs in test environments
- **Clean format** - Simple `[HH:MM:SS] message` format
- **Future-ready** - Prepared for Datadog integration

## Installation

```bash
npm install @filipgorny/logger
# or
pnpm add @filipgorny/logger
```

## Usage

### Basic Usage

```typescript
import { createLogger, LogLevel } from "@filipgorny/logger";

const logger = createLogger("my-service", LogLevel.INFO);

logger.debug("Debugging info"); // Cyan
logger.info("Server started"); // Yellow
logger.warn("High memory usage"); // Magenta/Pink
logger.error("Connection failed"); // Red
```

### Output Format

Logs are displayed in a clean, colorized format:

```
[08:46:40] Server started         # Yellow text, white timestamp
[08:46:45] High memory usage      # Pink text, white timestamp
[08:46:50] Connection failed      # Red text, white timestamp
```

### Color Scheme

- **Timestamp** `[HH:MM:SS]` - White
- **DEBUG** - Cyan
- **INFO** - Yellow
- **WARN** - Magenta (Pink)
- **ERROR** - Red

### Custom Strategy

```typescript
import { Logger, LogLevel, LogStrategy } from "@filipgorny/logger";

class CustomStrategy implements LogStrategy {
  log(entry: LogEntry): void {
    // Your custom logging logic
  }
}

const logger = new Logger(new CustomStrategy(), {
  service: "my-service",
  level: LogLevel.INFO,
});
```

### Child Loggers

```typescript
const logger = createLogger("api-service");
const requestLogger = logger.child({ requestId: "123", userId: "abc" });

requestLogger.info("Processing request"); // Includes requestId and userId
```

### Switching Strategies at Runtime

```typescript
import { ConsoleLogStrategy } from "@filipgorny/logger";

// Start with console
logger.setStrategy(new ConsoleLogStrategy());

// Switch to custom strategy
logger.setStrategy(new CustomStrategy());
```

### Test Environment

The logger automatically detects test environments (`NODE_ENV=test` or Jest) and suppresses `ERROR` level console output to keep test output clean.

## API

### `createLogger(serviceName, level?)`

Create a new logger instance.

- `serviceName`: Name of the service (e.g., 'llm-service')
- `level`: Minimum log level (default: `LogLevel.INFO`)

### Logger Methods

- `debug(message, context?)` - Debug level logging
- `info(message, context?)` - Info level logging
- `warn(message, context?)` - Warning level logging
- `error(message, error?, context?)` - Error level logging
- `child(context)` - Create a child logger with inherited context
- `setStrategy(strategy)` - Change the logging strategy
- `setLevel(level)` - Change the minimum log level

### Log Levels

- `DEBUG` - Detailed debugging information
- `INFO` - General informational messages (default)
- `WARN` - Warning messages
- `ERROR` - Error messages

## Strategies

### ConsoleLogStrategy (Default)

Logs to console with colorized output and clean timestamp format.

### Custom Strategy

Implement the `LogStrategy` interface:

```typescript
import { LogStrategy, LogEntry } from "@filipgorny/logger";

class MyCustomStrategy implements LogStrategy {
  log(entry: LogEntry): void {
    // Your custom logging logic
    console.log(`[${entry.service}] ${entry.message}`);
  }
}
```

## Advanced Features

### Table Logging

Display data in a beautiful table format:

```typescript
logger.table(
  [
    { name: "John", age: 30, city: "NYC" },
    { name: "Jane", age: 25, city: "LA" },
  ],
  [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
    { key: "city", header: "City" },
  ],
);
```

## License

MIT
