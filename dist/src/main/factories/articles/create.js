"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateArticleController = void 0;
const createArticleController_1 = require("../../../adapters/http/controllers/articles/createArticleController");
const postgresArticleRepository_1 = require("../../../external/database/postgreSQL/articles/postgresArticleRepository");
const connectionObject_1 = require("../utils/connectionObject");
const postgresUserRepository_1 = require("../../../external/database/postgreSQL/users/postgresUserRepository");
const articleUseCases_1 = require("@useCases/articles/articleUseCases");
const userRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject);
const makeCreateArticleController = () => {
    const createArticleRepository = new postgresArticleRepository_1.PostgresArticleRepository(connectionObject_1.connectionObject);
    const createArticle = new articleUseCases_1.ArticleUseCases(createArticleRepository, userRepository);
    const createArticleController = new createArticleController_1.CreateArticleController(createArticle);
    return createArticleController;
};
exports.makeCreateArticleController = makeCreateArticleController;
