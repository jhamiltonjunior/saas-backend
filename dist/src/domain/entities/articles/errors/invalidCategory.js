"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCategoryError = void 0;
class InvalidCategoryError extends Error {
    constructor(category) {
        super(`This category ${category} is invalid`);
        this.message = 'InvalidCategoryError';
    }
}
exports.InvalidCategoryError = InvalidCategoryError;
