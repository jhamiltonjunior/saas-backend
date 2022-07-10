"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowAllArticleController = void 0;
const httpHelper_1 = require("../helpers/httpHelper");
class ShowAllArticleController {
    constructor(articleUseCases) {
        this.articleUseCases = articleUseCases;
    }
    async handle(httpRequest) {
        try {
            const articleResponse = await this.articleUseCases.showAllArticle();
            httpRequest.body = articleResponse;
        }
        catch (error) {
            console.log(error);
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.ok)(httpRequest.body);
    }
}
exports.ShowAllArticleController = ShowAllArticleController;
