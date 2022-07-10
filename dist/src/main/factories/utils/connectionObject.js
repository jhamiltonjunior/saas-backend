"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionObject = void 0;
exports.connectionObject = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.BD_TABLE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};
