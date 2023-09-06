import { generateToken } from '../../../external/jwt/jwt'
import { comparePassword, generateHash } from '../../../external/bcrypt/bcrypt'
import { UserUseCases } from '../../../app/useCases/users/userUseCases'
import { DeleteUserController } from '../../../adapters/http/controllers/users/DeleteUserController'
import { PrismaUsersRepository } from '../../../external/database/prisma/users/prismaUsersRepository'

export const makeDeleteUserController = (): DeleteUserController => {
  const deleteUserRepository = new PrismaUsersRepository(generateHash, generateToken, comparePassword)
  const deleteUser = new UserUseCases(deleteUserRepository)
  const deleteUserController = new DeleteUserController(deleteUser)
  return deleteUserController
}
