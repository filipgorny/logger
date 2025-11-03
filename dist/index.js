"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.LogLevel = exports.ConsoleLogStrategy = exports.Logger = void 0;
var logger_1 = require("./logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
var console_log_strategy_1 = require("./strategies/console-log-strategy");
Object.defineProperty(exports, "ConsoleLogStrategy", { enumerable: true, get: function () { return console_log_strategy_1.ConsoleLogStrategy; } });
var types_1 = require("./types");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return types_1.LogLevel; } });
// Export a default logger instance for convenience
const logger_2 = require("./logger");
const types_2 = require("./types");
const createLogger = (serviceName, level = types_2.LogLevel.INFO) => {
    return new logger_2.Logger(undefined, {
        service: serviceName,
        level
    });
};
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map