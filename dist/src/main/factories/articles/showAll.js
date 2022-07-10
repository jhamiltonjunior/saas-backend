"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShowAllArticleController = void 0;
const showAllArticleController_1 = require("../../../adapters/http/controllers/articles/showAllArticleController");
const articleUseCases_1 = require("../../../app/useCases/articles/articleUseCases");
const postgresArticleRepository_1 = require("../../../external/database/postgreSQL/articles/postgresArticleRepository");
const connectionObject_1 = require("../utils/connectionObject");
const makeShowAllArticleController = () => {
    const articleRepository = new postgresArticleRepository_1.PostgresArticleRepository(connectionObject_1.connectionObject);
    const articleUseCases = new articleUseCases_1.ArticleUseCases(articleRepository);
    const showAllArticleController = new showAllArticleController_1.ShowAllArticleController(articleUseCases);
    return showAllArticleController;
};
exports.makeShowAllArticleController = makeShowAllArticleController;
