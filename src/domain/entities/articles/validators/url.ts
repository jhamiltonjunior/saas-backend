import { Either, left, right } from '../../../../shared/either'
import { InvalidURLError } from '../errors/invalidURL'

export class URL {
  private readonly url: string

  constructor (url : string) {
    this.url = url
  }

  static create (url: string): Either<InvalidURLError, URL> {
    url = url
      .toLowerCase()
      .replace(/( )+/g, '-')
      .replace(/(-)+/g, ' ')
      .trim()
      .split(' ')
      .join('-')

    if (!URL.validator(url)) {
      return left(new InvalidURLError(url))
    }

    return right(new URL(url))
  }

  get value (): string {
    return this.url
  }

  static validator (url: string): boolean {
    if (
      !url ||
      url.length < 10 ||
      url.length > 100
    ) {
      return false
    }

    return true
  }
}
