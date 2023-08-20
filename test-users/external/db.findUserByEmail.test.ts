import { config as dotenvConfig } from 'dotenv'

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

describe('External Postgres Repository', () => {
  test('should be undefined case the email not exist', async () => {
    const email = 'tes4188bd4f-8334-4859-89fa-eee@gmail.com'

    const user = await postgresUserRepository.findUserByEmail(email)

    // const newInvalidUser = await user.deleteUser(id)

    expect(user).toBeUndefined()
  })

  test('should be Truthy case the email exist', async () => {
    const email = 'test@gmail.com'

    const useCases = new UserUseCases(postgresUserRepository)

    await useCases.registerUserOnDatabase({ name: 'Hamilton', email: 'test@gmail.com', password: '123456' })

    const user = await postgresUserRepository.findUserByEmail(email)

    // const newInvalidUser = await user.deleteUser(id)

    expect(user).toBeTruthy()
  })
})
