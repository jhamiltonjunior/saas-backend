import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'
import { generateToken } from '../../../external/jwt/jwt'
import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
import { UserUseCases } from '../../../app/useCases/users/userUseCases'
// import { RegisterUser } from '@src/app/useCases/users/registerUser'

export const makeRegisterUserController = (): RegisterUserController => {
  const postgresUserRepository = new PrismaUsersRepository(generateToken)
  const registerUser = new UserUseCases(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
