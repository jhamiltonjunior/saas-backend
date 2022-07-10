"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteArticleController = void 0;
const postgresArticleRepository_1 = require("../../../external/database/postgreSQL/articles/postgresArticleRepository");
const connectionObject_1 = require("../utils/connectionObject");
const deleteArticleController_1 = require("../../../adapters/http/controllers/articles/deleteArticleController");
const articleUseCases_1 = require("../../../app/useCases/articles/articleUseCases");
const makeDeleteArticleController = () => {
    const deleteArticleRepository = new postgresArticleRepository_1.PostgresArticleRepository(connectionObject_1.connectionObject);
    const deleteArticle = new articleUseCases_1.ArticleUseCases(deleteArticleRepository);
    const deleteArticleController = new deleteArticleController_1.DeleteArticleController(deleteArticle);
    return deleteArticleController;
};
exports.makeDeleteArticleController = makeDeleteArticleController;
