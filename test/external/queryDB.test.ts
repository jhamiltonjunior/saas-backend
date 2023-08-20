/* eslint-disable no-undef */
import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { PostgresTasksRepository } from '../../src/external/database/postgreSQL/tasks/postgresTasksRepository'

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
  author: { user_id: 'ee2a1e16-5853-457f-8920-e04702f0c16b', name: 'string' },
  body: { name: '123456' },
  url: 'test-find-by-url-with-no-error',
  createdAt: new Date(),
  category: 'important'
}

describe('Use Cases of Tasks', () => {
  beforeAll(() => {
    postgresUserRepository.add(task, task.author.user_id)
  })

  afterAll(() => {
    postgresUserRepository.deleteByURL(task.url)
  })

  it('should find task if exists', async () => {
    const newTask = await postgresUserRepository.findByURL(task.url)

    expect(newTask).toBeTruthy()
    expect(!newTask).toBeFalsy()
  })

  it('should update task if exists', async () => {
    const newTask = await postgresUserRepository.update(task, task.url)

    expect(newTask).toBeTruthy()
    expect(!newTask).toBeFalsy()
  })

  it('should find all task if exists', async () => {
    const newTask = await postgresUserRepository.findAllTasks()

    expect(newTask).toBeTruthy()
    expect(!newTask).toBeFalsy()
  })
})
