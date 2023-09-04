import { generateToken } from '../../external/jwt/jwt'
import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { UserUseCases } from '../../app/useCases/users/userUseCases'
import { PostgresUserRepository } from '../../external/database/postgreSQL/user/postgresUserRepository'
import { DeleteUserController } from '../../adapters/http/controllers/users/DeleteUserController'

export const makeDeleteUserController = (): DeleteUserController => {
  const deleteUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken, comparePassword)
  const deleteUser = new UserUseCases(deleteUserRepository)
  const deleteUserController = new DeleteUserController(deleteUser)
  return deleteUserController
}
