"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCommentaryError = void 0;
class InvalidCommentaryError extends Error {
    constructor(commentary) {
        super(`This commentary ${commentary} is invalid`);
        this.message = 'InvalidCommentaryError';
    }
}
exports.InvalidCommentaryError = InvalidCommentaryError;
