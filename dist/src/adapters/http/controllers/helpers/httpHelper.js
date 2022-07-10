"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.ok = exports.created = exports.badRequest = void 0;
const serverError_1 = require("../errors/serverError");
const badRequest = (error) => ({
    statusCode: 400,
    body: error.message,
});
exports.badRequest = badRequest;
const created = (data) => ({
    statusCode: 201,
    body: data,
});
exports.created = created;
const ok = (data) => ({
    statusCode: 200,
    body: data,
});
exports.ok = ok;
const serverError = (reason) => ({
    statusCode: 500,
    body: new serverError_1.ServerError(reason),
});
exports.serverError = serverError;
