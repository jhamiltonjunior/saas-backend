"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
exports.default = (app) => {
    app.use(middleware_1.bodyParser);
    app.use(middleware_1.contentType);
};
