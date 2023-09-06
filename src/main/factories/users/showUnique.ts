import { UserUseCases } from '../../../app/useCases/users/userUseCases'
import { ShowUserController } from '../../../adapters/http/controllers/users/showUserController'
import { comparePassword, generateHash } from '../../../external/bcrypt/bcrypt'
import { generateToken } from '../../../external/jwt/jwt'
import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'

export const makeShowUniqueUserController = (): ShowUserController => {
  const postgresUserRepository = new PrismaUsersRepository(generateHash, generateToken, comparePassword
  )
  const ShowUser = new UserUseCases(postgresUserRepository)
  const showUserController = new ShowUserController(ShowUser)
  return showUserController
}
