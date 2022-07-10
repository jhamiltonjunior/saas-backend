"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShowUniqueArticleConstroller = void 0;
const articleUseCases_1 = require("../../../app/useCases/articles/articleUseCases");
const postgresArticleRepository_1 = require("../../../external/database/postgreSQL/articles/postgresArticleRepository");
const showUniqueArticleController_1 = require("../../../adapters/http/controllers/articles/showUniqueArticleController");
const connectionObject_1 = require("../utils/connectionObject");
const postgresUserRepository_1 = require("../../../external/database/postgreSQL/users/postgresUserRepository");
const userRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject);
const makeShowUniqueArticleConstroller = () => {
    const articleRepository = new postgresArticleRepository_1.PostgresArticleRepository(connectionObject_1.connectionObject);
    const articleUseCases = new articleUseCases_1.ArticleUseCases(articleRepository, userRepository);
    const showUniqueArticleController = new showUniqueArticleController_1.ShowUniqueArticleController(articleUseCases);
    return showUniqueArticleController;
};
exports.makeShowUniqueArticleConstroller = makeShowUniqueArticleConstroller;
