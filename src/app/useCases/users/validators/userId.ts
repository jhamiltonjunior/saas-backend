import { Either, left, right } from '../../../../shared/either'
import { InvalidUserIdError } from '../errors/invalidUserId'

export class UserId {
  private readonly userId: string

  constructor (userId: string) {
    this.userId = userId
    Object.freeze(this)
  }

  static create (userId: string): Either<InvalidUserIdError, UserId> {
    userId = userId.trim().replace(/( )+/g, '')

    if (!UserId.validate(userId)) {
      return left(new InvalidUserIdError(userId))
    }

    return right(new UserId(userId))
  }

  get value (): string {
    return this.userId
  }

  static validate (userId: string): boolean {
    if (!userId) {
      return false
    }

    return true
  }
}
