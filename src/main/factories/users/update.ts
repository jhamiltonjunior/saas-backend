import { UserUseCases } from '../../../app/useCases/users/userUseCases'
import { comparePassword, generateHash } from '../../../external/bcrypt/bcrypt'
import { generateToken, validateUser } from '../../../external/jwt/jwt'
import { UpdateUserController } from '../../../adapters/http/controllers/users/updateController'
import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'

export const makeUpdateUserController = (): UpdateUserController => {
  const postgresUserRepository = new PrismaUsersRepository(
    generateHash, generateToken, comparePassword
  )
  const updateUser = new UserUseCases(postgresUserRepository, validateUser)
  const updateUserController = new UpdateUserController(updateUser)
  return updateUserController
}
