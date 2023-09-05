import { InvalidNameError } from '../../../domain/entities/users/errors/invalidName'
import { IUser, IUserAuthData, IUserUpdateData } from '../../../domain/entities/users/interfaces/userData'
import { Either, left, right } from '../../../shared/either'

import { IUserRepository } from '../../repositories/userRepository'
import { UserResponse } from './responses/userResponse'
import { InvalidEmailError } from '../../../domain/entities/users/errors/invalidEmail'
import { InvalidPasswordError } from '../../../domain/entities/users/errors/invalidPassword'
import { User, UserAuth, UserUpdate } from '../../../domain/entities/users/user'
import { AuthUserResponse } from './responses/authUserResponse'
import { UserInterface } from './interfaces/userInterface'
import { UserId } from './validators/userId'
import { InvalidUserIdError } from './errors/invalidUserId'
import { DeleteUserResponse } from './responses/deleteUserResponse'
import { InvalidUserError } from './errors/invalidUser'
import { ShowUniqueUserResponse } from './responses/showUniqueUserResponse'

export class UserUseCases implements UserInterface {
  private readonly userRepository: IUserRepository
  public validateUser?: (token:string) => string

  constructor (
    userRepository: IUserRepository,
    validateUser?: (token:string) => string
  ) {
    this.userRepository = userRepository
    this.validateUser = validateUser || undefined
  }

  async registerUserOnDatabase (userData: IUser): Promise<UserResponse> {
    const userOrError: Either<
    InvalidNameError | InvalidEmailError | InvalidPasswordError,
    User> = User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const exists = this.userRepository.exists(userData.email)

    if (!(await exists).valueOf()) {
      const userId = await this.userRepository.add(userData)

      const token = await this.userRepository.authenticateUser(userId)
      return right({ userData, token })
    }

    if ((await exists).valueOf()) {
      return left(new InvalidEmailError('email exist'))
    }

    return right('Server Error')
  }

  async authWithEmail (authData: IUserAuthData): Promise<AuthUserResponse> {
    const userOrError: Either<
    InvalidNameError |
    InvalidEmailError,
    UserAuth> = UserAuth.auth(authData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const result = await this.userRepository.findUserByEmail(authData.email)

    if (!result) {
      return left(new InvalidUserError('this email not exist', ''))
    }

    const checkedPassword = await this.userRepository.comparePassword(
      // password of request body and password of database result
      authData.password, result.password
    )

    if (!checkedPassword) {
      return left(new InvalidUserError('', 'passwd not mathed'))
    }

    if (result.email && checkedPassword) {
      // I am attributing the jwt to property token of IUserAuthData
      authData.token = await this.userRepository.authenticateUser(result.user_id)
    } else if (authData.token === undefined) {
      authData.email = 'InvalidEmail'
      authData.password = 'InvalidPassword'
    }

    return right(authData)
  }

  async updateUserOnDatabase (userData: IUserUpdateData, id: string, token: string): Promise<UserResponse> {
    const userOrError: Either<
    InvalidNameError | InvalidEmailError | InvalidPasswordError,
    UserUpdate> = UserUpdate.update(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (id === undefined) return left(new InvalidUserIdError(id))

    if (userData.email) {
      const userFromEmail = this.userRepository.findUserByEmail(
        userData.email,
        { NOT: id }
      )
      if (userFromEmail === null) return left(new InvalidEmailError('email exist'))

      if ((await userFromEmail)?.user_id !== id) {
        return left(new InvalidEmailError('email exist'))
      }
    }

    const idRequest = this.validateUser!(token)
    const userDB = await this.userRepository.findUserById(id)

    if (userDB === null) return left(new InvalidUserIdError('User not exist'))

    if (idRequest !== userDB.user_id) {
      return left(new InvalidUserIdError('User not allowed'))
    }

    const user: UserUpdate = userOrError.value

    if (Object.keys(userDB).length === 0) return left(new InvalidEmailError('email not exist'))

    else {
      await this.userRepository.update({
        name: (<any>user.name).value || (await <any>userDB).user_name,
        email: user.email?.value || (await <any>userDB).user_email,
        password: user.password?.value || (await <any>userDB).user_password
      }, id)

      return right('User updated')
    }
  }

  /**
   * This method show a unique user
   * but not exist validation for verify uuid of params of request
   */
  async showUniqueUser (id: string): Promise<ShowUniqueUserResponse> {
    const idOrError = UserId.create(id)

    if (idOrError.isLeft()) {
      return left(new InvalidUserIdError(id))
    }

    const idValue = idOrError.value

    const user = await this.userRepository.findUserById(idValue.value)

    if (user === undefined || user === null) {
      return left(new Error('User ID not exists!'))
    }

    return right(user)
  }

  async deleteUser (id: string): Promise<DeleteUserResponse> {
    const idOrError = UserId.create(id)

    if (idOrError.isLeft()) {
      return left(new InvalidUserIdError(id))
    }

    const idValue = idOrError.value

    const user = await this.userRepository.findUserById(idValue.value)

    if (user === undefined || user === null) {
      return left(new Error('User ID not exists!'))
    } else if (user.user_id) {
      this.userRepository.deleteById(user.user_id)

      return right('User Deleted')
    }

    return left(new InvalidUserIdError(id))
  }
}

// ({
//   name: user.name.value,
//   email: user.email.value,
//   password: user.password.value,

//   identifier: user.email.value.split('@')[0],

// })
