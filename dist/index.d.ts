export { Logger } from './logger';
export { ConsoleLogStrategy } from './strategies/console-log-strategy';
export { LogLevel, LogEntry, LogStrategy, LoggerConfig } from './types';
import { Logger } from './logger';
import { LogLevel } from './types';
export declare const createLogger: (serviceName: string, level?: LogLevel) => Logger;
//# sourceMappingURL=index.d.ts.map