"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const either_1 = require("../../../shared/either");
const author_1 = require("./validators/author");
const body_1 = require("./validators/body");
const category_1 = require("./validators/category");
const createdAt_1 = require("./validators/createdAt");
const title_1 = require("./validators/title");
const url_1 = require("./validators/url");
const updatedAt_1 = require("./validators/updatedAt");
class Article {
    constructor(title, body, author, category, createdAt, url, updatedAt) {
        this.author = author;
        this.body = body;
        this.category = category;
        this.createdAt = createdAt;
        this.title = title;
        this.url = url;
        this.updatedAt = updatedAt;
        Object.freeze(this);
    }
    static create(article) {
        const authorOrError = author_1.Author.create(article.author);
        const bodyOrError = body_1.Body.create(article.body);
        const categoryOrError = category_1.Category.create(article.category);
        const createdAtOrError = createdAt_1.CreatedAt.create(article.createdAt);
        const titleOrError = title_1.Title.create(article.title);
        const urlOrError = url_1.URL.create(article.url);
        if (authorOrError.isLeft()) {
            return (0, either_1.left)(authorOrError.value);
        }
        if (bodyOrError.isLeft()) {
            return (0, either_1.left)(bodyOrError.value);
        }
        if (categoryOrError.isLeft()) {
            return (0, either_1.left)(categoryOrError.value);
        }
        if (createdAtOrError.isLeft()) {
            return (0, either_1.left)(createdAtOrError.value);
        }
        if (titleOrError.isLeft()) {
            return (0, either_1.left)(titleOrError.value);
        }
        if (urlOrError.isLeft()) {
            return (0, either_1.left)(urlOrError.value);
        }
        const title = titleOrError.value;
        const body = bodyOrError.value;
        const author = authorOrError.value;
        const category = categoryOrError.value;
        const createdAt = createdAtOrError.value;
        const url = urlOrError.value;
        return (0, either_1.right)(new Article(title, body, author, category, createdAt, url));
    }
    static update(article) {
        const authorOrError = author_1.Author.create(article.author);
        const bodyOrError = body_1.Body.create(article.body);
        const categoryOrError = category_1.Category.create(article.category);
        const createdAtOrError = createdAt_1.CreatedAt.create(article.createdAt);
        const titleOrError = title_1.Title.create(article.title);
        const urlOrError = url_1.URL.create(article.url);
        const updatedAtOrError = updatedAt_1.UpdatedAt.create(article.updatedAt);
        if (authorOrError.isLeft()) {
            return (0, either_1.left)(authorOrError.value);
        }
        if (bodyOrError.isLeft()) {
            return (0, either_1.left)(bodyOrError.value);
        }
        if (categoryOrError.isLeft()) {
            return (0, either_1.left)(categoryOrError.value);
        }
        if (createdAtOrError.isLeft()) {
            return (0, either_1.left)(createdAtOrError.value);
        }
        if (titleOrError.isLeft()) {
            return (0, either_1.left)(titleOrError.value);
        }
        if (urlOrError.isLeft()) {
            return (0, either_1.left)(urlOrError.value);
        }
        if (updatedAtOrError.isLeft()) {
            return (0, either_1.left)(updatedAtOrError.value);
        }
        const title = titleOrError.value;
        const body = bodyOrError.value;
        const author = authorOrError.value;
        const category = categoryOrError.value;
        const createdAt = createdAtOrError.value;
        const url = urlOrError.value;
        const updatedAt = updatedAtOrError.value;
        return (0, either_1.right)(new Article(title, body, author, category, createdAt, url, updatedAt));
    }
}
exports.Article = Article;
