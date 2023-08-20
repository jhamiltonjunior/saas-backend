/* eslint-disable no-undef */
import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { left } from '../../src/shared/either'

import { TasksUseCases } from '../../src/app/useCases/tasks/tasksUseCases'
import { PostgresTasksRepository } from '../../src/external/database/postgreSQL/tasks/postgresTasksRepository'
import { InvalidTitleError } from '../../src/domain/entities/tasks/errors/invalidTitle'
import { InvalidURLError } from '../../src/domain/entities/tasks/errors/invalidURL'

dotenvConfig()

const postgresUserRepository = new PostgresTasksRepository({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.BD_TABLE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const task = {
  title: 'Jose Hamilton',
  author: { user_id: '98283789-145a-4ec4-a385-e08d6095ceb7', name: 'string' },
  body: { name: '123456' },
  url: 'new-test-create-new-card-frame',
  createdAt: new Date(),
  category: '07494423010'
}

describe('Use Cases of Task', () => {
  /**
   * This tests does not persist the datas in database
   */

  it('should not create task with invalid title (too few characters)', async () => {
    task.title = 'C'
    const title = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    // ({ name, email: 'hamilton@gmail.com', password: '1234' })

    expect(await title).toEqual(left(new InvalidTitleError(task.title)))
  })

  it('should not create task with invalid title (too many characters)', async () => {
    let title: string = ''
    for (let i = 0; i < 256; i++) {
      title += 'h'
    }
    task.title = title

    const tasksUseCases = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    expect(await tasksUseCases).toEqual(left(new InvalidTitleError(title)))
  })

  test('should not create task with invalid title (only blank spaces)', async () => {
    task.title = '    '

    const useCases = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    expect(await useCases).toEqual(left(new InvalidTitleError(task.title)))
  })

  // test('should not create user with invalid email (empity string)', async () => {
  //   task.title = 'Jose Hamilton'
  //   task.body = ''

  //   const useCases = new TasksUseCases(postgresUserRepository)
  //     .createTasksOnDatabase(task, task.author)

  //   expect(await useCases).toEqual(left(new InvalidBodyError(task.body)))
  // })

  test('should not create task with invalid url (only blank spaces)', async () => {
    let url = ''

    for (let i = 0; i < 256; i++) {
      url += 'h'
    }
    task.title = 'Jose Hamilton'
    task.url = url

    const useCases = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    expect(await useCases).toEqual(left(new InvalidURLError(url)))
  })

  test('should not create task with invalid url (only blank spaces)', async () => {
    let url = ''

    for (let i = 0; i < 256; i++) {
      url += 'h'
    }
    task.url = url

    const useCases = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    expect(await useCases).toEqual(left(new InvalidURLError(url)))
  })
})
