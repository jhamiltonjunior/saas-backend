import { Either, left, right } from '../../../../shared/either'
import { InvalidBodyError } from '../errors/invalidBody'

export class Body {
  private readonly body: Object
  constructor (body: Object) {
    this.body = body

    Object.freeze(this)
  }

  static create (body: Object): Either<InvalidBodyError, Body> {
    // body = body.trim().replace(/( )+/g, ' ')

    if (!Body.validator(body)) {
      return left(new InvalidBodyError(body))
    }

    return right(new Body(body))
  }

  get value (): Object {
    return this.body
  }

  static validator (body: Object): boolean {
    if (
      !body
      // body.length < 100
    ) {
      return false
    }
    return true
  }
}
