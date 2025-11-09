export { Logger } from "./logger";
export { ConsoleLogStrategy } from "./strategies/console-log-strategy";
export { LogLevel, LogEntry, LogStrategy, LoggerConfig } from "./types";
export { createTable, TableColumn, TableOptions } from "./utils/table";

// Export a default logger instance for convenience
import { Logger } from "./logger";
import { LogLevel } from "./types";

export const createLogger = (
  serviceName: string,
  level: LogLevel = LogLevel.INFO,
): Logger => {
  return new Logger(undefined, {
    service: serviceName,
    level,
  });
};
