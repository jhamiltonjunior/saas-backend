"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleUseCases = void 0;
const article_1 = require("../../../domain/entities/articles/article");
const invalidURL_1 = require("../../../domain/entities/articles/errors/invalidURL");
const url_1 = require("../../../domain/entities/articles/validators/url");
const either_1 = require("../../../shared/either");
const invalidURLNotFound_1 = require("./errors/invalidURLNotFound");
const invalidUserDoesNotPermission_1 = require("./errors/invalidUserDoesNotPermission");
class ArticleUseCases {
    constructor(articleRepository, userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }
    async showAllArticle() {
        const article = await this.articleRepository.findAllArticles();
        if (article === undefined)
            return 'ArticleNotFound';
        return article;
    }
    async showUniqueArticle(urlParams) {
        const urlOrError = url_1.URL.create(urlParams);
        if (urlOrError.isLeft()) {
            return (0, either_1.left)(new invalidURL_1.InvalidURLError(urlParams));
        }
        const url = urlOrError.value;
        const article = await this.articleRepository.findByURL(url.value);
        const userId = article;
        if (this.userRepository) {
            const user = await this.userRepository.findUserById(userId.user_id);
            article.author = user;
        }
        if (article !== undefined) {
            return (0, either_1.right)(article);
        }
        else {
            return (0, either_1.left)(new invalidURLNotFound_1.InvalidURLNotFound(urlParams));
        }
    }
    async createArticleOnDatabase(articleData, author) {
        var _a;
        const articleOrError = article_1.Article.create(articleData);
        if (articleOrError.isLeft()) {
            return (0, either_1.left)(articleOrError.value);
        }
        const article = articleOrError.value;
        const result = await this.articleRepository.findByURL(article.url.value);
        const permissions = await ((_a = this.userRepository) === null || _a === void 0 ? void 0 : _a.getPermission(article.author.value.user_id));
        if (permissions === null || permissions === void 0 ? void 0 : permissions.includes('writer')) {
            if (result === undefined) {
                await this.articleRepository.add({
                    title: article.title.value,
                    author: article.author.value,
                    body: article.body.value,
                    url: article.url.value,
                    category: article.category.value,
                    createdAt: article.createdAt.value
                }, String(author.user_id));
            }
        }
        else {
            return (0, either_1.left)(new invalidUserDoesNotPermission_1.InvalidUserDoesNotPermission(article.author.value.name));
        }
        return (0, either_1.right)(articleData);
    }
    async updateArticle(articleData, author, urlParams) {
        var _a, _b;
        const articleOrError = article_1.Article.create(articleData);
        if (articleOrError.isLeft()) {
            return (0, either_1.left)(articleOrError.value);
        }
        const article = articleOrError.value;
        const result = await this.articleRepository.findByURL(urlParams);
        const permissions = await ((_a = this.userRepository) === null || _a === void 0 ? void 0 : _a.getPermission(article.author.value.user_id));
        console.log('id do author', result.user_id);
        console.log('id atual', String(author.user_id));
        console.log('id do author que ta no article', article.author.value.user_id);
        console.log(author.user_id === article.author.value.user_id);
        if ((permissions === null || permissions === void 0 ? void 0 : permissions.includes('writer')) &&
            author.user_id === result.user_id) {
            if (result !== undefined) {
                await this.articleRepository.update({
                    title: article.title.value || result.title,
                    author: article.author.value || result.author,
                    body: article.body.value || result.body,
                    url: article.url.value || result.url,
                    category: article.category.value || result.category,
                    createdAt: result.createdAt,
                    updatedAt: (_b = article.updatedAt) === null || _b === void 0 ? void 0 : _b.value
                }, urlParams);
            }
        }
        else {
            return (0, either_1.left)(new invalidUserDoesNotPermission_1.InvalidUserDoesNotPermission(article.author.value.name));
        }
        return (0, either_1.right)(articleData);
    }
    async deleteArticle(urlParams) {
        const urlOrError = url_1.URL.create(urlParams);
        if (urlOrError.isLeft()) {
            return (0, either_1.left)(new invalidURL_1.InvalidURLError(urlParams));
        }
        const url = urlOrError.value;
        const article = await this.articleRepository.findByURL(url.value);
        if (article !== undefined) {
            this.articleRepository.deleteByURL(article.url);
            return (0, either_1.right)('This Article has been deleted');
        }
        else {
            return (0, either_1.left)(new invalidURLNotFound_1.InvalidURLNotFound(urlParams));
        }
    }
}
exports.ArticleUseCases = ArticleUseCases;
