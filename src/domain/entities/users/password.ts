import { Either, left, right } from '../../../shared/either'
import { InvalidPasswordError } from './errors/invalidPassword'

export class Password {
  private readonly password: string

  constructor (password: string) {
    this.password = password
  }

  static create (password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }

    return right(new Password(password))
  }

  get value (): string {
    return this.password
  }

  static validate (password: string): boolean {
    if (!password) {
      return false
    }

    if (password.length < 6 || password.length > 33) {
      return false
    }

    return true
  }
}
