"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAuthorError = void 0;
class InvalidAuthorError extends Error {
    constructor(author) {
        super(`This author ${author} is invalid`);
        this.message = 'InvalidAuthorError';
    }
}
exports.InvalidAuthorError = InvalidAuthorError;
