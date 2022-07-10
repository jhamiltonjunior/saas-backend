"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterRouteShowArticle = void 0;
const adapterRouteShowArticle = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            params: req.params
        };
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
exports.adapterRouteShowArticle = adapterRouteShowArticle;
