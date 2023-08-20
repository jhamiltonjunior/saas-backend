import { config as dotenvConfig } from 'dotenv'

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'
import { left } from '../../src/shared/either'

// import { IUserRepository } from '../src/app/repositories/userRepository'
// import { UserResponse } from '../src/app/useCases/users/userResponse'
// import { IRegisterUser } from '../src/app/useCases/users/interfaces/registerUser'
import { InvalidEmailError } from '../../src/domain/entities/users/errors/invalidEmail'
import { InvalidPasswordError } from '../../src/domain/entities/users/errors/invalidPassword'
import { UserUseCases } from '../../src/app/useCases/users/userUseCases'
import { PostgresUserRepository } from '../../src/external/database/postgreSQL/user/postgresUserRepository'
import { comparePassword, generateHash } from '../../src/external/bcrypt/bcrypt'
import { generateToken } from '../../src/external/jwt/jwt'
import { InvalidUserError } from '../../src/app/useCases/users/errors/invalidUser'

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
  /**
   * This tests does not persist the datas in database
   */
  test('should not create user with invalid email (empity string)', async () => {
    const email = ''

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email, password: '1234' }))

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid name (only blank spaces)', async () => {
    let email = ''

    for (let i = 0; i < 256; i++) {
      email += 'h'
    }

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email, password: '1234' }))

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid email (outwith @)', async () => {
    const email = 'hamiltongmail.com'

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email, password: '1234' }))

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid email (outwith dot)', async () => {
    const email = 'hamilton@gmailcom'

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email, password: '1234' }))

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid password (with less than six characters)', async () => {
    const password = '12345'

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email: 'hamilton@gmail.com', password }))

    expect(await useCases).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create user with invalid password (more than thirty-two characters)', async () => {
    let password = ''

    for (let i = 0; i < 34; i++) {
      password += 'h'
    }

    const useCases = new UserUseCases(postgresUserRepository)
      .authWithEmail(({ email: 'hamilton@gmail.com', password }))

    expect(await useCases).toEqual(left(new InvalidPasswordError(password)))
  })

  //  f
  // d

  test('should not autenticate user if the password is incorrect', async () => {
    const user = { email: 'test@gmail.com', password: '1234567' }

    const useCases = new UserUseCases(postgresUserRepository)

    const newInvalidUser = await useCases.authWithEmail(user)

    expect(newInvalidUser).toEqual(left(new InvalidUserError('', 'InvalidPassword')))
  })
})
