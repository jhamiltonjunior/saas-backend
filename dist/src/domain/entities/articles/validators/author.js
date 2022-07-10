"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const either_1 = require("../../../../shared/either");
const invalidAuthor_1 = require("../errors/invalidAuthor");
class Author {
    constructor(author) {
        this.author = author;
    }
    static create(author) {
        author.name = author.name.trim().replace(/( )+/g, ' ');
        if (!Author.validator) {
            return (0, either_1.left)(new invalidAuthor_1.InvalidAuthorError(author));
        }
        return (0, either_1.right)(new Author(author));
    }
    get value() {
        return this.author;
    }
    static validator(author) {
        if (!author.user_id ||
            !author.name ||
            author.name.length < 2 ||
            author.name.length > 255) {
            return false;
        }
        return true;
    }
}
exports.Author = Author;
