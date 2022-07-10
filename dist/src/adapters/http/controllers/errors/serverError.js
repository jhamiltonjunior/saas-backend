"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(reason) {
        super(`Server Error: ${reason}.`);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
