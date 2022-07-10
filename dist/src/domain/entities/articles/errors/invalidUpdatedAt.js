"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUpdatedAtError = void 0;
class InvalidUpdatedAtError extends Error {
    constructor(updatedAt) {
        super(`This updated at ${updatedAt} is invalid`);
        this.message = 'InvalidUpdatedError';
    }
}
exports.InvalidUpdatedAtError = InvalidUpdatedAtError;
