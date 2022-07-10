"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleController = void 0;
const httpHelper_1 = require("../helpers/httpHelper");
const missingParamError_1 = require("../errors/missingParamError");
class CreateArticleController {
    constructor(articleUseCases) {
        this.articleUseCases = articleUseCases;
    }
    async handle(httpRequest, author) {
        const articleData = {
            title: httpRequest.body.title,
            body: httpRequest.body.body,
            author,
            category: httpRequest.body.category,
            createdAt: new Date(),
            url: httpRequest.body.url,
        };
        try {
            if (!httpRequest.body.url ||
                !httpRequest.body.body ||
                !httpRequest.body.title ||
                !httpRequest.body.category) {
                const field = !httpRequest.body
                    ? 'url' ||
                        'title' ||
                        'author'
                    : 'category';
                return (0, httpHelper_1.badRequest)(new missingParamError_1.MissingParamError(field));
            }
            const articleResponse = await this.articleUseCases.createArticleOnDatabase(articleData, author);
            if (articleResponse.isLeft()) {
                return (0, httpHelper_1.badRequest)(articleResponse.value);
            }
        }
        catch (error) {
            console.log(error);
            return (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.created)(httpRequest.body);
    }
}
exports.CreateArticleController = CreateArticleController;
