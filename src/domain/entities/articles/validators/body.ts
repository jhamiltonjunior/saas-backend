import { Either, left, right } from '../../../../shared/either'
import { InvalidBodyError } from '../errors/invalidBody'

// change
export class Body {
  private readonly body: string
  constructor (body: string) {
    this.body = body

    Object.freeze(this)
  }

  static create (body: string): Either<InvalidBodyError, Body> {
    body = body.trim().replace(/( )+/g, ' ')

    if (!Body.validator(body)) {
      return left(new InvalidBodyError(body))
    }

    return right(new Body(body))
  }

  get value (): string {
    return this.body
  }

  static validator (body: string): boolean {
    if (
      !body ||
      body.length < 100
    ) {
      return false
    }
    return true
  }
}
