import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { left } from '../../src/shared/either'

// import { IUserRepository } from '../src/app/repositories/userRepository'
// import { UserResponse } from '../src/app/useCases/users/userResponse'
// import { IRegisterUser } from '../src/app/useCases/users/interfaces/registerUser'
import { UserUseCases } from '../../src/app/useCases/users/userUseCases'
import { PostgresUserRepository } from '../../src/external/database/postgreSQL/user/postgresUserRepository'
import { comparePassword, generateHash } from '../../src/external/bcrypt/bcrypt'
import { generateToken } from '../../src/external/jwt/jwt'

dotenvConfig()

const postgresUserRepository = new PostgresUserRepository(
  {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.BD_TABLE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  generateHash,
  generateToken,
  comparePassword,
)

describe('Use Cases of User', () => {
  test('should not delete user if id is not exists', async () => {
    const id = '4188bd4f-8334-4859-89fa-eee99ad69cf4'

    const useCases = new UserUseCases(postgresUserRepository)

    const newInvalidUser = await useCases.deleteUser(id)

    expect(newInvalidUser).toEqual(left(new Error('User ID not exists!')))
  })
})
