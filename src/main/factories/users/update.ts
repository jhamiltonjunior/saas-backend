import { UserUseCases } from '../../app/useCases/users/userUseCases'
import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '../../external/database/postgreSQL/user/postgresUserRepository'
import { generateToken, validateUser } from '../../external/jwt/jwt'
import { UpdateUserController } from '../../adapters/http/controllers/users/updateController'

export const makeUpdateUserController = (): UpdateUserController => {
  const postgresUserRepository = new PostgresUserRepository(
    connectionObject, generateHash, generateToken, comparePassword
  )
  const updateUser = new UserUseCases(postgresUserRepository, validateUser)
  const updateUserController = new UpdateUserController(updateUser)
  return updateUserController
}
