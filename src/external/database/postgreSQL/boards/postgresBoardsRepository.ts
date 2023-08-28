import { IBoardsData } from '../../../../domain/entities/boards/interfaces/boardsData'
import { IBoardsRepository } from '../../../../app/repositories/boardsRepository'
import { PostgresHelper } from '../helpers/postgresHelper'
import { v4 as uuidv4 } from 'uuid'

export class PostgresBoardsRepository implements IBoardsRepository {
  postgresHelper: PostgresHelper

  constructor (
    connectionObject: object,
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
  }

  async findAllBoards (): Promise<IBoardsData[]> {
    const result = await this.postgresHelper.query(`z
    SELECT *
    FROM boards
    JOIN users ON users.user_id = boards.user_id
    `, [])

    result.rows[0].password = ''

    return result.rows
  }

  async findByURL (url: string): Promise<IBoardsData> {
    const result = await this.postgresHelper.query(`
      SELECT boards.*, users.* as author FROM boards
      JOIN users ON users.user_id = boards.user_id
      WHERE url = $1 
    `, [url])

    return result.rows[0]
  }

  async add (boards: IBoardsData, userId: string): Promise<any> {
    await this.postgresHelper.query(
      `INSERT INTO boards(
        boards_id,
        user_id,
        title,
        url,
        createdAt
      ) VALUES(
        $1,
        $2,
        $3,
        $4,
        $5,
      )`,
      [
        uuidv4(),
        userId,
        boards.title,
        boards.url,
        new Date(),
      ]
    )
  }

  async update (boards: IBoardsData, urlParams: string): Promise<any> {
    return await this.postgresHelper.query(
      `
      UPDATE boards
      SET 
        title = $1,
        url = $2,
        updatedAt = $3
      WHERE
        url = $4
      `,
      [
        boards.title,
        boards.url,
        new Date(),
        urlParams
      ]
    )
  }

  async getPermission (id: string): Promise<string[]> {
    const usersPermissions = await this.postgresHelper.reader(
      `
        SELECT name, description, created_at
        FROM users_permissions
        JOIN permissions ON permissions.permissions_id = users_permissions.permissions_id
        WHERE user_id = $1`,
      [id]
    )

    return usersPermissions.rows
  }

  async deleteByURL (url: string): Promise<void> {
    await this.postgresHelper.query(`
      DELETE FROM boards
      WHERE url = $1
    `, [
      url
    ])
  }
}
