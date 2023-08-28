import { Either, left, right } from '../../../../shared/either'
import { InvalidCreatedAtError } from '../errors/invalidCreatedAt'

export class CreatedAt {
  private readonly createdAt: Date

  constructor (createdAt: Date) {
    this.createdAt = createdAt

    Object.freeze(this)
  }

  static create (createdAt: Date): Either<InvalidCreatedAtError, CreatedAt> {
    if (!CreatedAt.validator(createdAt)) {
      return left(new InvalidCreatedAtError(createdAt))
    }

    return right(new CreatedAt(createdAt))
  }

  get value (): Date {
    return this.createdAt
  }

  static validator (createdAt: Date): boolean {
    if (!createdAt) {
      return false
    }

    return true
  }
}
