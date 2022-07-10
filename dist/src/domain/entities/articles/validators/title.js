"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const either_1 = require("../../../../shared/either");
const invalidTitle_1 = require("../errors/invalidTitle");
class Title {
    constructor(title) {
        this.title = title;
        Object.freeze(this);
    }
    static create(title) {
        title = title.trim().replace(/( )+/g, ' ');
        if (!Title.validator(title)) {
            return (0, either_1.left)(new invalidTitle_1.InvalidTitleError(title));
        }
        return (0, either_1.right)(new Title(title));
    }
    get value() {
        return this.title;
    }
    static validator(title) {
        if (!title ||
            title.length > 255 ||
            title.length < 10) {
            return false;
        }
        return true;
    }
}
exports.Title = Title;
