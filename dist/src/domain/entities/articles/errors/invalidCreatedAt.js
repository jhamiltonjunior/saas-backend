"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCreatedAtError = void 0;
class InvalidCreatedAtError extends Error {
    constructor(createdAt) {
        super(`This created at ${createdAt} is invalid`);
        this.message = 'InvalidCreatedAtError';
    }
}
exports.InvalidCreatedAtError = InvalidCreatedAtError;
