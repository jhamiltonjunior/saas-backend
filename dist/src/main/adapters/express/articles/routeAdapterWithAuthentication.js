"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterRouteWithAuthentication = void 0;
const jwt_1 = require("../../../../external/jwt/jwt");
const adapterRouteWithAuthentication = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            params: req.params
        };
        const authHeaders = req.headers.authorization;
        if (authHeaders === undefined) {
            res.status(401).json({ message: 'Token error' });
            return;
        }
        const parts = authHeaders.split(' ');
        if (parts.length !== 2) {
            res.status(401).json({ message: 'Token error' });
        }
        const [, token] = parts;
        const id = (0, jwt_1.validateUser)(token);
        const author = {
            user_id: id,
            name: 'any'
        };
        const httpResponse = await controller.handle(httpRequest, author);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
exports.adapterRouteWithAuthentication = adapterRouteWithAuthentication;
