"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteArticleController = void 0;
const httpHelper_1 = require("../helpers/httpHelper");
class DeleteArticleController {
    constructor(articleUseCases) {
        this.articleUseCases = articleUseCases;
    }
    async handle(httpRequest) {
        const url = httpRequest.params.url;
        try {
            const articleResponse = await this.articleUseCases.deleteArticle(url);
            if (articleResponse.isLeft()) {
                return (0, httpHelper_1.badRequest)(articleResponse.value);
            }
            httpRequest.body = articleResponse;
        }
        catch (error) {
            console.log(error);
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.ok)(httpRequest.body);
    }
}
exports.DeleteArticleController = DeleteArticleController;
