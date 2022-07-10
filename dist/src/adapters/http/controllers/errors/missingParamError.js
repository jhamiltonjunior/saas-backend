"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(paramError) {
        super(`Missing Param: ${paramError}`);
        this.message = 'Missing Param Error';
    }
}
exports.MissingParamError = MissingParamError;
