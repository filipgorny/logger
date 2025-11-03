export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  service?: string
  context?: Record<string, any>
  error?: Error
}

export interface LogStrategy {
  log(entry: LogEntry): void
}

export interface LoggerConfig {
  service?: string
  level?: LogLevel
  strategy?: LogStrategy
}
