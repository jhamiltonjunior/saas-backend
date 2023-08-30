import { ITasksData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { ITasksRepository } from '../../../../app/repositories/tasksRepository'
import { PostgresHelper } from '../helpers/postgresHelper'
import { v4 as uuidv4 } from 'uuid'

export class PostgresTasksRepository implements ITasksRepository {
  postgresHelper: PostgresHelper

  constructor (
    connectionObject: object,
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
  }

  async findAllTasks (): Promise<ITasksData[]> {
    const result = await this.postgresHelper.query(`
    SELECT *
    FROM tasks
    JOIN users ON users.user_id = tasks.user_id
    JOIN boards ON boards.boards_id = tasks.boards_id
    WHERE tasks.deletedAt IS NULL
    AND boards.deletedAt IS NULL
    -- AND tasks_id
    `, []
    )

    result.rows.length > 0 ? result.rows[0].password = '' : null

    return result.rows
  }

  async findByURL (url: string): Promise<ITasksData> {
    const result = await this.postgresHelper.query(`
      SELECT tasks.*, users.* as author FROM tasks
      JOIN users ON users.user_id = tasks.user_id
      WHERE url = $1 
    `, [url])

    result.rows.length > 0 ? result.rows[0].password = '' : null

    return result.rows[0]
  }

  async add (tasks: ITasksData, userId: string, boardsId: string): Promise<any> {
    await this.postgresHelper.query(
      `INSERT INTO tasks(
        tasks_id,
        user_id,
        boards_id,
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
        $7,
        $8
      )`,
      [
        uuidv4(),
        userId,
        boardsId,
        tasks.title,
        JSON.stringify(tasks.body),
        tasks.category,
        tasks.url,
        new Date(),
      ]
    )
  }

  async update (tasks: ITasksData, urlParams: string): Promise<any> {
    return await this.postgresHelper.query(
      `
      UPDATE tasks
      SET 
        title = $1,
        body = $2,
        category = $3,
        url = $4,
        updatedAt = $5
      WHERE
        url = $6
      `,
      [
        tasks.title,
        JSON.stringify(tasks.body),
        tasks.category,
        tasks.url,
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
    /*
    const permissionsId: any[] = []

    usersPermissions.rows.forEach((column: any) => {
      permissionsId.push(column.permissions_id)
    })

    const permissionsNameToArrays = permissionsId.map(async (id: string): Promise<string> => {
      const permissions = await this.postgresHelper.reader(
        `
          SELECT *
          FROM permissions
          WHERE permissions_id = $1`,
        [id]
      )

      return permissions.rows[0].name
    })

    let permissionsName: string = ''

    for (const value of permissionsNameToArrays) {
      permissionsName += `${(await value).toString()} `
    }

    // ESTOU RETORNANDO AS PERMISSÕES QUE UM USUÁRIO TEM
    return permissionsName.trim()
    */
  }

  async deleteByURL (url: string): Promise<void> {
    await this.postgresHelper.query(`
      DELETE FROM tasks
      WHERE url = $1
    `, [
      url
    ])
  }
}
