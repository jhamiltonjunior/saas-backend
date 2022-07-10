"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTitleError = void 0;
class InvalidTitleError extends Error {
    constructor(title) {
        super(`This title ${title} is invalid`);
        this.message = 'InvalidTitleError';
    }
}
exports.InvalidTitleError = InvalidTitleError;
