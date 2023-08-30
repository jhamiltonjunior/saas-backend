import { Either, left, right } from '../../../../shared/either'
import { InvalidAuthorError } from '../errors/invalidAuthor'

// eslint-disable-next-line camelcase
export type AuthorData = { user_id: string, name: string }

export class Author {
  private readonly author: AuthorData

  constructor (author: AuthorData) {
    this.author = author
  }

  static create (author: AuthorData): Either <InvalidAuthorError, Author> {
    author.name = author.name.trim().replace(/( )+/g, ' ')

    if (!Author.validator) {
      return left(new InvalidAuthorError(author))
    }

    return right(new Author(author))
  }

  get value (): AuthorData {
    return this.author
  }

  static validator (author: AuthorData): boolean {
    if (
      !author.user_id ||
      !author.name ||
      author.name.length < 2 ||
      author.name.length > 255
    ) {
      return false
    }

    return true
  }
}
