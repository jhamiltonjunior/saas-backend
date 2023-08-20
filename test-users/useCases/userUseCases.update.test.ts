import { config as dotenvConfig } from 'dotenv'
import { randomUUID } from 'crypto'

import { InvalidNameError } from '../../src/domain/entities/users/errors/invalidName'
import { left, right } from '../../src/shared/either'

import { InvalidEmailError } from '../../src/domain/entities/users/errors/invalidEmail'
import { InvalidPasswordError } from '../../src/domain/entities/users/errors/invalidPassword'
import { UserUseCases } from '../../src/app/useCases/users/userUseCases'
import { PostgresUserRepository } from '../../src/external/database/postgreSQL/user/postgresUserRepository'
import { comparePassword, generateHash } from '../../src/external/bcrypt/bcrypt'
import { generateToken, validateUser } from '../../src/external/jwt/jwt'
import { InvalidUserIdError } from '../../src/app/useCases/users/errors/invalidUserId'

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

  let id = ''

  beforeAll(async () => {
    id = await postgresUserRepository.add({
      name: 'José Hamilton',
      email: randomUUID() + '@gmail.com',
      password: '1234567'
    })
  })

  test('should not update user with invalid name (too few characters)', async () => {
    const name = 'O'
    const user = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name, email: 'hamilton@gmail.com', password: '1234567' },
        id,
        generateToken(id)
      )

    // ({ name, email: 'hamilton@gmail.com', password: '1234' })

    expect(await user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not update user with invalid name (too many characters)', async () => {
    let name: string = ''
    for (let i = 0; i < 256; i++) {
      name += 'h'
    }
    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name, email: 'hamilton@gmail.com', password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidNameError(name)))
  })

  test('should not update user with invalid name (only blank spaces)', async () => {
    const name: string = '    '

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name, email: 'hamilton@gmail.com', password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidNameError(name)))
  })

  test('should not update user with invalid email (empity string)', async () => {
    const email = ''

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email, password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not update user with invalid name (only blank spaces)', async () => {
    let email = ''

    for (let i = 0; i < 256; i++) {
      email += 'h'
    }

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email, password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not update user with invalid email (outwith @)', async () => {
    const email = 'hamiltongmail.com'

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email, password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not update user with invalid email (outwith dot)', async () => {
    const email = 'hamilton@gmailcom'

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email, password: '1234567' },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not update user with invalid password (with less than six characters)', async () => {
    const password = '12345'

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email: 'hamilton@gmail.com', password },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not update user with invalid password (more than thirty-two characters)', async () => {
    let password = ''

    for (let i = 0; i < 34; i++) {
      password += 'h'
    }

    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email: 'hamilton@gmail.com', password },
        id,
        generateToken(id)
      )

    expect(await useCases).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not update user if email exists', async () => {
    const user = { name: 'Hamilton', email: randomUUID() + '@gmail.com', password: '123456' }

    await postgresUserRepository.add(user)

    const newInvalidUser = new UserUseCases(postgresUserRepository, validateUser).updateUserOnDatabase(
      user,
      id,
      generateToken(id)
    )

    expect(await newInvalidUser).toEqual(left(new InvalidEmailError('email exist')))
  })

  test('should not update user if not allowed', async () => {
    const user = { name: 'Hamilton', email: randomUUID() + '@gmail.com', password: '123456' }

    await postgresUserRepository.add(user)

    user.email = randomUUID() + '@gmail.com'
    const newInvalidUser = new UserUseCases(postgresUserRepository, validateUser).updateUserOnDatabase(
      user,
      id,
      generateToken('id')
    )

    expect(await newInvalidUser).toEqual(left(new InvalidUserIdError('User not allowed')))
  })

  test('should update user', async () => {
    const useCases = new UserUseCases(postgresUserRepository, validateUser)
      .updateUserOnDatabase(
        { name: 'Hamilton', email: randomUUID() + '@gmail.com', password: '123456' },
        id,
        generateToken(id)
      )

    expect(right(await useCases)).toEqual(right({ value: 'User updated' }))
  })
})
