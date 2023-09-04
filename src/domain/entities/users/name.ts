import { Either, left, right } from '../../../shared/either'
import { InvalidNameError } from './errors/invalidName'

export class Name {
  private readonly name?: string

  constructor (name?: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (name?: string): Either<InvalidNameError, Name> {
    if (name !== undefined) {
      name = name.trim().replace(/( )+/g, ' ')
      if (!Name.validate(name)) {
        return left(new InvalidNameError(name))
      }
    }

    return right(new Name(name))
  }

  get value (): string | undefined {
    return this.name
  }

  static validate (name?:string): boolean {
    if (name !== undefined) {
      if (name.length < 2 || name.length > 255) {
        return false
      }
    }

    return true
  }
}
