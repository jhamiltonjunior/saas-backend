"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresArticleRepository = void 0;
const postgresHelper_1 = require("../helpers/postgresHelper");
const uuid_1 = require("uuid");
class PostgresArticleRepository {
    constructor(connectionObject) {
        this.postgresHelper = new postgresHelper_1.PostgresHelper(connectionObject);
    }
    async findAllArticles() {
        const result = await this.postgresHelper.query('SELECT * FROM articles', []);
        return result.rows;
    }
    async findByURL(url) {
        const result = await this.postgresHelper.query('SELECT * FROM articles WHERE url = $1', [url]);
        return result.rows[0];
    }
    async add(article, userId) {
        await this.postgresHelper.query(`INSERT INTO articles(
        article_id,
        user_id,
        title,
        body,
        category,
        url,
        createdAt
      ) VALUES(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )`, [
            (0, uuid_1.v4)(),
            userId,
            article.title,
            article.body,
            article.category,
            article.url,
            new Date(),
        ]);
    }
    async update(article, urlParams) {
        await this.postgresHelper.query(`
      UPDATE articles
      SET 
        title = $1,
        body = $2,
        category = $3,
        url = $4,
        updatedAt = $5
      WHERE
        url = $6
      `, [
            article.title,
            article.body,
            article.category,
            article.url,
            new Date(),
            urlParams
        ]);
    }
    async deleteByURL(url) {
        await this.postgresHelper.query(`
      DELETE FROM articles
      WHERE url = $1
    `, [
            url
        ]);
    }
}
exports.PostgresArticleRepository = PostgresArticleRepository;
