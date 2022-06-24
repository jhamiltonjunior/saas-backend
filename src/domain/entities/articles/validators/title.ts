import { Either, left, right } from '../../../../shared/either'
import { InvalidTitleError } from '../errors/invalidTitle'

export class Title {
  private readonly title: string

  constructor (title: string) {
    this.title = title

    Object.freeze(this)
  }

  static create (title: string): Either<InvalidTitleError, Title> {
    title = title.trim().replace(/( )+/g, ' ')

    if (!Title.validator(title)) {
      return left(new InvalidTitleError(title))
    }

    return right(new Title(title))
  }

  get value (): string {
    return this.title
  }

  static validator (title: string): boolean {
    if (
      !title ||
      title.length > 255 ||
      title.length < 10
    ) {
      return false
    }

    return true
  }
}
