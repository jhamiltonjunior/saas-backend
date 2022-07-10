"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const invalidCategory_1 = require("../errors/invalidCategory");
const either_1 = require("../../../../shared/either");
class Category {
    constructor(category) {
        this.category = category;
    }
    static create(category) {
        category = category.trim().replace(/( )+/g, ' ');
        if (!Category.validator) {
            return (0, either_1.left)(new invalidCategory_1.InvalidCategoryError(category));
        }
        return (0, either_1.right)(new Category(category));
    }
    get value() {
        return this.category;
    }
    static validator(category) {
        if (!category ||
            category.length < 6 ||
            category.length > 20) {
            return false;
        }
        return false;
    }
}
exports.Category = Category;
