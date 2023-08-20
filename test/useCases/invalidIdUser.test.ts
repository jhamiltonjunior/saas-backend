/* eslint-disable no-undef */
import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { left } from '../../src/shared/either'

// import { IUserRepository } from '../src/app/repositories/userRepository'
// import { UserResponse } from '../src/app/useCases/users/userResponse'
// import { IRegisterUser } from '../src/app/useCases/users/interfaces/registerUser'
import { TasksUseCases } from '../../src/app/useCases/tasks/tasksUseCases'
import { PostgresTasksRepository } from '../../src/external/database/postgreSQL/tasks/postgresTasksRepository'
import { InvalidUserDoesNotPermission } from '../../src/app/useCases/tasks/errors/invalidUserDoesNotPermission'

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
  author: { user_id: '98283789-145a-4ec4-a385-e08d6095ceb6', name: 'string' },
  body: { name: '123456' },
  url: '1341454514',
  createdAt: new Date(),
  category: '07494423010'
}

describe('Use Cases of Tasks', () => {
  it('should not update user with invalid name (too few characters)', async () => {
    const useCases = new TasksUseCases(postgresUserRepository)
      .updateTask(task, task.author, task.url)

    expect(await useCases).toEqual(left(new InvalidUserDoesNotPermission(task.author.user_id)))
  })

  it('should not update user with invalid name (too few characters)', async () => {
    const useCases = new TasksUseCases(postgresUserRepository)
      .createTasksOnDatabase(task, task.author)

    expect(await useCases).toEqual(left(new InvalidUserDoesNotPermission(task.author.user_id)))
  })
})
