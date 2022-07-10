"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
const either_1 = require("../../../../shared/either");
const invalidURL_1 = require("../errors/invalidURL");
class URL {
    constructor(url) {
        this.url = url;
    }
    static create(url) {
        url = url
            .toLowerCase()
            .replace(/( )+/g, '-')
            .replace(/(-)+/g, ' ')
            .trim()
            .split(' ')
            .join('-');
        if (!URL.validator(url)) {
            return (0, either_1.left)(new invalidURL_1.InvalidURLError(url));
        }
        return (0, either_1.right)(new URL(url));
    }
    get value() {
        return this.url;
    }
    static validator(url) {
        if (!url ||
            url.length < 10 ||
            url.length > 100) {
            return false;
        }
        return true;
    }
}
exports.URL = URL;
