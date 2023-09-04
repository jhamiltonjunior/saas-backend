import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '../../external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '../../external/jwt/jwt'
import { RegisterUserController } from '../../adapters/http/controllers/users/registerUserController'
import { UserUseCases } from '../../app/useCases/users/userUseCases'
// import { RegisterUser } from '@src/app/useCases/users/registerUser'

export const makeRegisterUserController = (): RegisterUserController => {
  const postgresUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken, comparePassword)
  const registerUser = new UserUseCases(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
