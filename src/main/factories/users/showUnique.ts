import { UserUseCases } from '../../app/useCases/users/userUseCases'
import { ShowUserController } from '../../adapters/http/controllers/users/showUserController'
import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '../../external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '../../external/jwt/jwt'

export const makeShowUniqueUserController = (): ShowUserController => {
  const postgresUserRepository = new PostgresUserRepository(
    connectionObject, generateHash, generateToken, comparePassword
  )
  const ShowUser = new UserUseCases(postgresUserRepository)
  const showUserController = new ShowUserController(ShowUser)
  return showUserController
}
