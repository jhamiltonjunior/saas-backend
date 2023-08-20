import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { left } from '../../src/shared/either'

// import { IUserRepository } from '../src/app/repositories/userRepository'
// import { UserResponse } from '../src/app/useCases/users/userResponse'
// import { IRegisterUser } from '../src/app/useCases/users/interfaces/registerUser'
import { TasksUseCases } from '../../src/app/useCases/tasks/tasksUseCases'
import { PostgresTasksRepository } from '../../src/external/database/postgreSQL/tasks/postgresTasksRepository'

dotenvConfig()

const postgresUserRepository = new PostgresTasksRepository({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.BD_TABLE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

describe('Use Cases of Tasks', () => {
  it('should not delete task if id is not exists', async () => {
    const id = '4188bd4f-8334-4859-89fa-eee99ad69cf4'

    const useCases = new TasksUseCases(postgresUserRepository)

    const newInvalidTask = await useCases.deleteTasks(id)

    expect(newInvalidTask).toEqual(left(new Error('Task ID not exist!')))
  })
})
