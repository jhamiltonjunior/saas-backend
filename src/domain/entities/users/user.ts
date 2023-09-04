import { Either, left, right } from '../../../shared/either'
import { InvalidNameError } from './errors/invalidName'
import { Name } from './name'
import { IUser } from './interfaces/userData'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalidEmail'
import { Password } from './password'
import { InvalidPasswordError } from './errors/invalidPassword'

export class User {
  public readonly name?: Name
  public readonly email: Email
  public readonly password: Password

  constructor (
    email: Email,
    password: Password,
    name?: Name,
  ) {
    this.name = name
    this.email = email
    this.password = password

    Object.freeze(this)
  }

  static create (userData: IUser): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name)
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(userData.email)
    const passwordOrError: Either<InvalidPasswordError, Password> = Password.create(userData.password)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const password: Password = passwordOrError.value

    return right(new User(
      email,
      password,
      name,
    ))
  }
}

export class UserUpdate {
  public readonly name?: Name
  public readonly email?: Email
  public readonly password?: Password

  constructor (
    email?: Email,
    password?: Password,
    name?: Name,
  ) {
    this.name = name
    this.email = email
    this.password = password

    Object.freeze(this)
  }

  static update (userData: IUser): Either<InvalidNameError | InvalidEmailError, UserUpdate> {
    const nameOrError: Either<InvalidNameError, Name> | undefined = Name.create(userData.name)
    const emailOrError: Either<InvalidEmailError, Email> | undefined = userData.email !== undefined ? Email.create(userData.email) : undefined
    const passwordOrError: Either<InvalidPasswordError, Password> | undefined = userData.password !== undefined ? Password.create(userData.password) : undefined

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError && emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    if (passwordOrError && passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const name: Name | undefined = nameOrError.value
    const email: Email | undefined = emailOrError?.value
    const password: Password | undefined = passwordOrError?.value

    return right(new UserUpdate(
      email,
      password,
      name,
    ))
  }
}
