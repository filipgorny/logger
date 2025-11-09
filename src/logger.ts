import "reflect-metadata";
import { Inject } from "@filipgorny/di";
import { LogLevel, LogEntry, LogStrategy, LoggerConfig } from "./types";
import { ConsoleLogStrategy } from "./strategies/console-log-strategy";
import { createTable, TableColumn, TableOptions } from "./utils/table";

export class Logger {
  private service?: string;
  private minLevel: LogLevel;
  private strategy: LogStrategy;

  constructor(
    @Inject() strategy?: ConsoleLogStrategy,
    config: LoggerConfig = {},
  ) {
    this.strategy = strategy || config.strategy || new ConsoleLogStrategy();
    this.service = config.service;
    this.minLevel = config.level || LogLevel.INFO;
  }

  setStrategy(strategy: LogStrategy): void {
    this.strategy = strategy;
  }

  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
    ];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    error?: Error,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      service: this.service,
      context,
      error,
    };
  }

  debug(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      const entry = this.createEntry(LogLevel.DEBUG, message, context);
      this.strategy.log(entry);
    }
  }

  info(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const entry = this.createEntry(LogLevel.INFO, message, context);
      this.strategy.log(entry);
    }
  }

  warn(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.WARN)) {
      const entry = this.createEntry(LogLevel.WARN, message, context);
      this.strategy.log(entry);
    }
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const entry = this.createEntry(LogLevel.ERROR, message, context, error);
      this.strategy.log(entry);
    }
  }

  child(context: Record<string, any>): Logger {
    const childLogger = new Logger(this.strategy as any, {
      service: this.service,
      level: this.minLevel,
    });

    // Wrap the strategy to include context in all logs
    const originalStrategy = this.strategy;
    childLogger.setStrategy({
      log(entry: LogEntry) {
        originalStrategy.log({
          ...entry,
          context: { ...context, ...entry.context },
        });
      },
    });

    return childLogger;
  }

  // Log a beautiful table with colors and emoji
  table(data: any[], columns: TableColumn[], options?: TableOptions): void {
    const tableString = createTable(data, columns, options);
    console.log(tableString);
  }
}
