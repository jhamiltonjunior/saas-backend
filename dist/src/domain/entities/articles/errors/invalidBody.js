"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidBodyError = void 0;
class InvalidBodyError extends Error {
    constructor(body) {
        super(`This body ${body} is invalid`);
        this.message = 'InvalidBodyError';
    }
}
exports.InvalidBodyError = InvalidBodyError;
