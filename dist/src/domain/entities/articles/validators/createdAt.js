"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedAt = void 0;
const either_1 = require("../../../../shared/either");
const invalidCreatedAt_1 = require("../errors/invalidCreatedAt");
class CreatedAt {
    constructor(createdAt) {
        this.createdAt = createdAt;
        Object.freeze(this);
    }
    static create(createdAt) {
        if (!CreatedAt.validator(createdAt)) {
            return (0, either_1.left)(new invalidCreatedAt_1.InvalidCreatedAtError(createdAt));
        }
        return (0, either_1.right)(new CreatedAt(createdAt));
    }
    get value() {
        return this.createdAt;
    }
    static validator(createdAt) {
        if (!createdAt) {
            return false;
        }
        return true;
    }
}
exports.CreatedAt = CreatedAt;
