import { Either, right } from '../../../../shared/either'
import { InvalidUpdatedAtError } from '../errors/invalidUpdatedAt'

export class UpdatedAt {
  private readonly updatedAt?: Date

  constructor (updatedAt?: Date) {
    this.updatedAt = updatedAt

    Object.freeze(this)
  }

  static create (updatedAt?: Date): Either<InvalidUpdatedAtError, UpdatedAt> {
    // if (!UpdatedAt.validator(updatedAt)) {
    //   return left(new InvalidUpdatedAtError(updatedAt))
    // }

    return right(new UpdatedAt(updatedAt))
  }

  get value (): Date | undefined {
    return this.updatedAt
  }

  // static validator (updatedAt?: Date): boolean {
  //   if (!updatedAt) {
  //     return false
  //   }

  //   return true
  // }
}
