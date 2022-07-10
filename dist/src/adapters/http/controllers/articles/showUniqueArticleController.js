"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowUniqueArticleController = void 0;
const missingParamError_1 = require("../errors/missingParamError");
const httpHelper_1 = require("../helpers/httpHelper");
class ShowUniqueArticleController {
    constructor(articleUseCases) {
        this.articleUseCases = articleUseCases;
    }
    async handle(httpRequest) {
        const url = httpRequest.params.url;
        try {
            if (!httpRequest.params) {
                const field = !httpRequest.params ? '' : ' ';
                return (0, httpHelper_1.badRequest)(new missingParamError_1.MissingParamError(field));
            }
            const articleResponse = await this.articleUseCases.showUniqueArticle(url);
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
exports.ShowUniqueArticleController = ShowUniqueArticleController;
