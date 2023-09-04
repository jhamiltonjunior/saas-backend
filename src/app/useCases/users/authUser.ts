import { Either, left, right } from '../../../shared/either'
import { IUserAuthData } from '../../../domain/entities/users/interfaces/userData'
import { IAuthUserRepository } from '../../repositories/userRepository'
import { AuthUserResponse } from './authUserResponse'
import { IAuthUser } from './interfaces/authUser'
import { User } from '../../../domain/entities/users/user'
import { InvalidNameError } from '../../../domain/entities/users/errors/invalidName'
import { InvalidEmailError } from '../../../domain/entities/users/errors/invalidEmail'

export class AuthUser implements IAuthUser {
  public readonly authUserRepository: IAuthUserRepository

  constructor (authUserRepo: IAuthUserRepository) {
    this.authUserRepository = authUserRepo
  }

  async authWithEmail (authData: IUserAuthData): Promise<AuthUserResponse> {
    const userOrError: Either<
    InvalidNameError |
    InvalidEmailError,
    User> = User.create(authData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const result = await this.authUserRepository.findUserByEmail(authData.email)
    // console.log('authUser', result.user_id)
    const checkedPassword = await this.authUserRepository.comparePassword(
      // password of request body and password of database result
      authData.password, result.password
    )

    if (result.email && checkedPassword) {
      // I am attributing the jwt to property token of IUserAuthData
      authData.token = await this.authUserRepository.authenticateUser(result.user_id)
    } else if (authData.token === undefined) {
      authData.email = 'InvalidEmail'
      authData.password = 'InvalidPassword'
    }

    return right(authData)
  }
}
