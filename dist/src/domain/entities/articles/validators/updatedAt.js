"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedAt = void 0;
const either_1 = require("../../../../shared/either");
class UpdatedAt {
    constructor(updatedAt) {
        this.updatedAt = updatedAt;
        Object.freeze(this);
    }
    static create(updatedAt) {
        return (0, either_1.right)(new UpdatedAt(updatedAt));
    }
    get value() {
        return this.updatedAt;
    }
}
exports.UpdatedAt = UpdatedAt;
