"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeAdapterShowUnique_1 = require("../adapters/express/articles/routeAdapterShowUnique");
const routeAdapterWithAuthentication_1 = require("../adapters/express/articles/routeAdapterWithAuthentication");
const create_1 = require("../factories/articles/create");
const showUnique_1 = require("../factories/articles/showUnique");
const showAll_1 = require("../factories/articles/showAll");
const delete_1 = require("../factories/articles/delete");
const update_1 = require("../factories/articles/update");
exports.default = (router) => {
    router.get('/article', (0, routeAdapterShowUnique_1.adapterRouteShowArticle)((0, showAll_1.makeShowAllArticleController)()));
    router.get('/article/:url', (0, routeAdapterShowUnique_1.adapterRouteShowArticle)((0, showUnique_1.makeShowUniqueArticleConstroller)()));
    router.post('/article', (0, routeAdapterWithAuthentication_1.adapterRouteWithAuthentication)((0, create_1.makeCreateArticleController)()));
    router.put('/article/:url', (0, routeAdapterWithAuthentication_1.adapterRouteWithAuthentication)((0, update_1.makeUpdateArticleController)()));
    router.delete('/article/:url', (0, routeAdapterWithAuthentication_1.adapterRouteWithAuthentication)((0, delete_1.makeDeleteArticleController)()));
};
