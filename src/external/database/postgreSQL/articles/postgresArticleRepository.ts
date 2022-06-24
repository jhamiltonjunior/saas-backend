import { IArticleData } from '../../../../domain/entities/articles/interfaces/articleData'
import { IArticleRepository } from '../../../../app/repositories/articleRepository'
import { PostgresHelper } from '../helpers/postgresHelper'
import { v4 as uuidv4 } from 'uuid'

export class PostgresArticleRepository implements IArticleRepository {
  postgresHelper: PostgresHelper

  constructor (
    connectionObject: object,
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
  }

  async findAllArticles (): Promise<IArticleData[]> {
    const result = await this.postgresHelper.query('SELECT * FROM articles', [])

    return result.rows
  }

  async findByURL (url: string): Promise<IArticleData> {
    const result = await this.postgresHelper.query('SELECT * FROM articles WHERE url = $1', [url])

    return result.rows[0]
  }

  async add (article: IArticleData, userId: string): Promise<any> {
    await this.postgresHelper.query(
      `INSERT INTO articles(
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
      )`,
      [
        uuidv4(),
        userId,
        article.title,
        article.body,
        article.category,
        article.url,
        new Date(),
      ]
    )
  }

  async deleteByURL (url: string): Promise<void> {
    await this.postgresHelper.query(`
      DELETE FROM articles
      WHERE url = $1
    `, [
      url
    ])
  }
}
