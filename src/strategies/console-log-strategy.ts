import { LogStrategy, LogEntry, LogLevel } from '../types'

export class ConsoleLogStrategy implements LogStrategy {
  private colors = {
    [LogLevel.DEBUG]: '\x1b[36m', // Cyan
    [LogLevel.INFO]: '\x1b[32m',  // Green
    [LogLevel.WARN]: '\x1b[33m',  // Yellow
    [LogLevel.ERROR]: '\x1b[31m'  // Red
  }

  private reset = '\x1b[0m'

  log(entry: LogEntry): void {
    const color = this.colors[entry.level]
    const timestamp = entry.timestamp.toISOString()
    const service = entry.service ? `[${entry.service}]` : ''
    const level = entry.level.toUpperCase().padEnd(5)

    const prefix = `${color}${timestamp} ${service} ${level}${this.reset}`
    const message = `${prefix} | ${entry.message}`

    // Log to appropriate console method
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message, entry.context || '')
        break
      case LogLevel.INFO:
        console.log(message, entry.context || '')
        break
      case LogLevel.WARN:
        console.warn(message, entry.context || '')
        break
      case LogLevel.ERROR:
        console.error(message, entry.context || '', entry.error || '')
        break
    }
  }
}
