"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresHelper = void 0;
const pg_1 = require("pg");
class PostgresHelper {
    constructor(connectionObject) {
        this.pool = new pg_1.Pool(connectionObject);
    }
    async query(sql, values) {
        return this.pool.query(sql, values);
    }
    async writer(sql, values) {
        return this.pool.query(sql, values);
    }
    async reader(sql, values) {
        return this.pool.query(sql, values);
    }
    async disconnect() {
        this.pool.end();
    }
}
exports.PostgresHelper = PostgresHelper;
