"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commentary = void 0;
const either_1 = require("../../../../shared/either");
const invalidCommentary_1 = require("../errors/invalidCommentary");
class Commentary {
    constructor(commentary) {
        this.commentary = commentary;
    }
    static create(commentary) {
        commentary.title = commentary.title.trim().replace(/( )+/g, ' ');
        commentary.body = commentary.body.trim().replace(/( )+/g, ' ');
        if (!Commentary.validator(commentary)) {
            return (0, either_1.left)(new invalidCommentary_1.InvalidCommentaryError(commentary));
        }
        return (0, either_1.right)(new Commentary(commentary));
    }
    get value() {
        return this.commentary;
    }
    static validator(commentary) {
        if (!commentary.title ||
            commentary.title.length < 10 ||
            commentary.title.length > 70) {
            return false;
        }
        if (!commentary.body ||
            commentary.body.length < 10 ||
            commentary.body.length > 3000) {
            return false;
        }
        return true;
    }
}
exports.Commentary = Commentary;
