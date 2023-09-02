import { Either, left, right } from '../../../../shared/either'
import { InvalidBodyError } from '../errors/invalidBody'

export class Description {
  private readonly body: string
  constructor (body: string) {
    this.body = body

    Object.freeze(this)
  }

  static create (body: string): Either<InvalidBodyError, Description> {
    body = body ? body.trim().replace(/( )+/g, ' ') : ''

    if (!Description.validator(body)) {
      return left(new InvalidBodyError(body))
    }

    return right(new Description(body))
  }

  get value (): string {
    return this.body
  }

  static validator (body: string): boolean {
    if (body) {
      if (
        typeof body !== 'string' ||
      body.length < 10
      ) {
        return false
      }
    }
    return true
  }
}
