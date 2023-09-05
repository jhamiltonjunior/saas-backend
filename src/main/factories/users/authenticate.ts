import { generateToken } from '../../../external/jwt/jwt'
import { AuthUserController } from '../../../adapters/http/controllers/users/authUserController'
import { comparePassword, generateHash } from '../../../external/bcrypt/bcrypt'
import { UserUseCases } from '../../../app/useCases/users/userUseCases'
import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'

export const makeAuthUserController = (): AuthUserController => {
  const authUserRepository = new PrismaUsersRepository(generateHash, generateToken, comparePassword)
  const authUser = new UserUseCases(authUserRepository)
  const authUserController = new AuthUserController(authUser)
  return authUserController
}
