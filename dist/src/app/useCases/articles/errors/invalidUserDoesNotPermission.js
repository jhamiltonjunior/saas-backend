"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUserDoesNotPermission = void 0;
class InvalidUserDoesNotPermission extends Error {
    constructor(user) {
        super(`This user ${user} does not permission`);
        this.message = 'InvalidUserDoesNotPermission';
    }
}
exports.InvalidUserDoesNotPermission = InvalidUserDoesNotPermission;
