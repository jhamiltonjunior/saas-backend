"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidURLError = void 0;
class InvalidURLError extends Error {
    constructor(url) {
        super(`This url ${url} is invalid`);
        this.message = 'InvalidURLError';
    }
}
exports.InvalidURLError = InvalidURLError;
