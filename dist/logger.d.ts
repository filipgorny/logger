import 'reflect-metadata';
import { LogLevel, LogStrategy, LoggerConfig } from './types';
import { ConsoleLogStrategy } from './strategies/console-log-strategy';
export declare class Logger {
    private service?;
    private minLevel;
    private strategy;
    constructor(strategy?: ConsoleLogStrategy, config?: LoggerConfig);
    setStrategy(strategy: LogStrategy): void;
    setLevel(level: LogLevel): void;
    private shouldLog;
    private createEntry;
    debug(message: string, context?: Record<string, any>): void;
    info(message: string, context?: Record<string, any>): void;
    warn(message: string, context?: Record<string, any>): void;
    error(message: string, error?: Error, context?: Record<string, any>): void;
    child(context: Record<string, any>): Logger;
}
//# sourceMappingURL=logger.d.ts.map