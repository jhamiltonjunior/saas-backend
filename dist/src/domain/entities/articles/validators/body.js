"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const either_1 = require("../../../../shared/either");
const invalidBody_1 = require("../errors/invalidBody");
class Body {
    constructor(body) {
        this.body = body;
        Object.freeze(this);
    }
    static create(body) {
        body = body.trim().replace(/( )+/g, ' ');
        if (!Body.validator(body)) {
            return (0, either_1.left)(new invalidBody_1.InvalidBodyError(body));
        }
        return (0, either_1.right)(new Body(body));
    }
    get value() {
        return this.body;
    }
    static validator(body) {
        if (!body ||
            body.length < 100) {
            return false;
        }
        return true;
    }
}
exports.Body = Body;
