"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
require("reflect-metadata");
const di_1 = require("@filipgorny/di");
const types_1 = require("./types");
const console_log_strategy_1 = require("./strategies/console-log-strategy");
let Logger = Logger_1 = class Logger {
    constructor(strategy, config = {}) {
        this.strategy = strategy || config.strategy || new console_log_strategy_1.ConsoleLogStrategy();
        this.service = config.service;
        this.minLevel = config.level || types_1.LogLevel.INFO;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    setLevel(level) {
        this.minLevel = level;
    }
    shouldLog(level) {
        const levels = [types_1.LogLevel.DEBUG, types_1.LogLevel.INFO, types_1.LogLevel.WARN, types_1.LogLevel.ERROR];
        return levels.indexOf(level) >= levels.indexOf(this.minLevel);
    }
    createEntry(level, message, context, error) {
        return {
            level,
            message,
            timestamp: new Date(),
            service: this.service,
            context,
            error
        };
    }
    debug(message, context) {
        if (this.shouldLog(types_1.LogLevel.DEBUG)) {
            const entry = this.createEntry(types_1.LogLevel.DEBUG, message, context);
            this.strategy.log(entry);
        }
    }
    info(message, context) {
        if (this.shouldLog(types_1.LogLevel.INFO)) {
            const entry = this.createEntry(types_1.LogLevel.INFO, message, context);
            this.strategy.log(entry);
        }
    }
    warn(message, context) {
        if (this.shouldLog(types_1.LogLevel.WARN)) {
            const entry = this.createEntry(types_1.LogLevel.WARN, message, context);
            this.strategy.log(entry);
        }
    }
    error(message, error, context) {
        if (this.shouldLog(types_1.LogLevel.ERROR)) {
            const entry = this.createEntry(types_1.LogLevel.ERROR, message, context, error);
            this.strategy.log(entry);
        }
    }
    child(context) {
        const childLogger = new Logger_1(this.strategy, {
            service: this.service,
            level: this.minLevel
        });
        // Wrap the strategy to include context in all logs
        const originalStrategy = this.strategy;
        childLogger.setStrategy({
            log(entry) {
                originalStrategy.log({
                    ...entry,
                    context: { ...context, ...entry.context }
                });
            }
        });
        return childLogger;
    }
};
exports.Logger = Logger;
exports.Logger = Logger = Logger_1 = __decorate([
    __param(0, (0, di_1.Inject)()),
    __metadata("design:paramtypes", [console_log_strategy_1.ConsoleLogStrategy, Object])
], Logger);
//# sourceMappingURL=logger.js.map