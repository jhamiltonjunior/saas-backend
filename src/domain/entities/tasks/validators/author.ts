import { Either, left, right } from '../../../../shared/either'
import { InvalidAuthorError } from '../errors/invalidAuthor'

// eslint-disable-next-line camelcase
export type AuthorData = { userId: string, name: string }

export class Author {
  private readonly userId: string

  constructor (userId: string) {
    this.userId = userId
  }

  static create (userId: string): Either <InvalidAuthorError, Author> {
    userId = userId.trim().replace(/( )+/g, ' ')

    if (!Author.validator) {
      return left(new InvalidAuthorError(userId))
    }

    return right(new Author(userId))
  }

  get value (): string {
    return this.userId
  }

  static validator (userId: string): boolean {
    if (
      !userId ||
      !userId ||
      userId.length < 2 ||
      userId.length > 255
    ) {
      return false
    }

    return true
  }
}
