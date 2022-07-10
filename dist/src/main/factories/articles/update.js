"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateArticleController = void 0;
const postgresArticleRepository_1 = require("../../../external/database/postgreSQL/articles/postgresArticleRepository");
const connectionObject_1 = require("../utils/connectionObject");
const postgresUserRepository_1 = require("../../../external/database/postgreSQL/users/postgresUserRepository");
const articleUseCases_1 = require("@useCases/articles/articleUseCases");
const updateArticleController_1 = require("@src/adapters/http/controllers/articles/updateArticleController");
const userRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject);
const makeUpdateArticleController = () => {
    const updateArticleRepository = new postgresArticleRepository_1.PostgresArticleRepository(connectionObject_1.connectionObject);
    const updateArticle = new articleUseCases_1.ArticleUseCases(updateArticleRepository, userRepository);
    const updateArticleController = new updateArticleController_1.UpdateArticleController(updateArticle);
    return updateArticleController;
};
exports.makeUpdateArticleController = makeUpdateArticleController;
