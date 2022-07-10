"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("../../../../src/shared/either");
const invalidBody_1 = require("../../../../src/domain/entities/articles/errors/invalidBody");
const invalidTitle_1 = require("../../../../src/domain/entities/articles/errors/invalidTitle");
const invalidURL_1 = require("../../../../src/domain/entities/articles/errors/invalidURL");
const article_1 = require("../../../../src/domain/entities/articles/article");
describe('Article Domain Entity', () => {
    it('Should not create article with invalid title (little characters)', () => {
        const title = 'o';
        const article = article_1.Article.create({
            title,
            body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
            createdAt: new Date,
            url: 'stringddddd',
            author: {
                user_id: 'string',
                name: 'string',
            },
            category: 'strinddg',
        });
        expect(article).toEqual((0, either_1.left)(new invalidTitle_1.InvalidTitleError(title)));
    });
    it('Should not create article with invalid body (little characters)', () => {
        const body = 'w';
        const article = article_1.Article.create({
            title: 'sdddddddddddd',
            body,
            createdAt: new Date,
            url: 'stringddddd',
            author: {
                user_id: 'string',
                name: 'string',
            },
            category: 'strinddg',
        });
        expect(article).toEqual((0, either_1.left)(new invalidBody_1.InvalidBodyError(body)));
    });
    it('Should not create article with invalid url (little characters)', () => {
        const url = 'o';
        const article = article_1.Article.create({
            title: 'oddoooooooo',
            body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
            createdAt: new Date,
            updatedAt: new Date,
            url,
            author: {
                user_id: 'string',
                name: 'string',
            },
            category: 'strinddg',
        });
        expect(article).toEqual((0, either_1.left)(new invalidURL_1.InvalidURLError(url)));
    });
    it('Should not create article with invalid title (very characters)', () => {
        let title = '';
        for (let i = 0; i < 265; i++) {
            title = 'o';
        }
        const article = article_1.Article.create({
            title,
            body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
            createdAt: new Date,
            updatedAt: new Date,
            url: 'kkkkkkkkkkkk',
            author: {
                user_id: '',
                name: ''
            },
            category: 'ddddddddddddd',
        });
        expect(article).toEqual((0, either_1.left)(new invalidTitle_1.InvalidTitleError(title)));
    });
    it('Should not create article with invalid url (very characters)', () => {
        let url = '';
        for (let i = 0; i < 100; i++) {
            url = 'o';
        }
        const article = article_1.Article.create({
            title: '000000d 0000',
            body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
            createdAt: new Date,
            updatedAt: new Date,
            url,
            author: {
                user_id: '',
                name: ''
            },
            category: 'kdkkkkdkdkkddfdfdd',
        });
        expect(article).toEqual((0, either_1.left)(new invalidURL_1.InvalidURLError(url)));
    });
});
