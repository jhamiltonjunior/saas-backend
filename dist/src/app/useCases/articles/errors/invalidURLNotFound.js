"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidURLNotFound = void 0;
class InvalidURLNotFound extends Error {
    constructor(url) {
        super(`This url ${url} does not exist`);
        this.message = 'InvalidURLNotFound';
    }
}
exports.InvalidURLNotFound = InvalidURLNotFound;
