import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'
import { generateToken } from '../../../external/jwt/jwt'
import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
import { UserUseCases } from '../../../app/useCases/users/userUseCases'
import { comparePassword, generateHash } from '../../../external/bcrypt/bcrypt'

export const makeRegisterUserController = (): RegisterUserController => {
  const postgresUserRepository = new PrismaUsersRepository(generateHash, generateToken, comparePassword)
  const registerUser = new UserUseCases(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
