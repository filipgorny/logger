"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogStrategy = void 0;
const types_1 = require("../types");
class ConsoleLogStrategy {
    constructor() {
        this.colors = {
            [types_1.LogLevel.DEBUG]: '\x1b[36m', // Cyan
            [types_1.LogLevel.INFO]: '\x1b[32m', // Green
            [types_1.LogLevel.WARN]: '\x1b[33m', // Yellow
            [types_1.LogLevel.ERROR]: '\x1b[31m' // Red
        };
        this.reset = '\x1b[0m';
    }
    log(entry) {
        const color = this.colors[entry.level];
        const timestamp = entry.timestamp.toISOString();
        const service = entry.service ? `[${entry.service}]` : '';
        const level = entry.level.toUpperCase().padEnd(5);
        const prefix = `${color}${timestamp} ${service} ${level}${this.reset}`;
        const message = `${prefix} | ${entry.message}`;
        // Log to appropriate console method
        switch (entry.level) {
            case types_1.LogLevel.DEBUG:
                console.debug(message, entry.context || '');
                break;
            case types_1.LogLevel.INFO:
                console.log(message, entry.context || '');
                break;
            case types_1.LogLevel.WARN:
                console.warn(message, entry.context || '');
                break;
            case types_1.LogLevel.ERROR:
                console.error(message, entry.context || '', entry.error || '');
                break;
        }
    }
}
exports.ConsoleLogStrategy = ConsoleLogStrategy;
//# sourceMappingURL=console-log-strategy.js.map