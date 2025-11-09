import { LogStrategy, LogEntry, LogLevel } from "../types";

export class ConsoleLogStrategy implements LogStrategy {
  private colors = {
    [LogLevel.DEBUG]: "\x1b[36m", // Cyan
    [LogLevel.INFO]: "\x1b[33m", // Yellow
    [LogLevel.WARN]: "\x1b[35m", // Magenta (Pink)
    [LogLevel.ERROR]: "\x1b[31m", // Red
  };

  private white = "\x1b[37m"; // White for timestamp
  private reset = "\x1b[0m";

  log(entry: LogEntry): void {
    // Format: [HH:MM:SS] message
    // Timestamp in white, message in color based on log level
    const date = entry.timestamp;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;

    const color = this.colors[entry.level];
    const message = `${this.white}[${timeString}]${this.reset} ${color}${entry.message}${this.reset}`;

    // Detect test environment - suppress error logs in tests
    const isTestEnv =
      process.env.NODE_ENV === "test" ||
      process.env.JEST_WORKER_ID !== undefined;

    // Log to appropriate console method
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message);
        break;
      case LogLevel.INFO:
        console.log(message);
        break;
      case LogLevel.WARN:
        console.warn(message);
        break;
      case LogLevel.ERROR:
        // Don't log errors to console in test environment to keep test output clean
        if (!isTestEnv) {
          console.error(message);
        }
        break;
    }
  }
}
