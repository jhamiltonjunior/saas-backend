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
    const result = await this.postgresHelper.query('SELECT * FROM tasks', [])

    return result.rows
  }

  async findByURL (url: string): Promise<ITasksData> {
    const result = await this.postgresHelper.query(`
      SELECT tasks.*, users.* as author FROM tasks
      JOIN users ON users.user_id = tasks.user_id
      WHERE url = $1 
    `, [url])

    return result.rows[0]
  }

  async add (tasks: ITasksData, userId: string): Promise<any> {
    await this.postgresHelper.query(
      `INSERT INTO tasks(
        tasks_id,
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
        tasks.title,
        JSON.stringify(tasks.body),
        tasks.category,
        tasks.url,
        new Date(),
      ]
    )
  }

  async update (tasks: ITasksData, urlParams: string): Promise<any> {
    await this.postgresHelper.query(
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

  async deleteByURL (url: string): Promise<void> {
    await this.postgresHelper.query(`
      DELETE FROM tasks
      WHERE url = $1
    `, [
      url
    ])
  }
}
