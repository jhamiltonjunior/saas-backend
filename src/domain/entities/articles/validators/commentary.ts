import { Either, left, right } from '../../../../shared/either'
import { InvalidCommentaryError } from '../errors/invalidCommentary'

type CommentaryData = { title: string, body: string }

export class Commentary {
  private readonly commentary: CommentaryData

  constructor (commentary: CommentaryData) {
    this.commentary = commentary
  }

  static create (commentary: CommentaryData): Either<InvalidCommentaryError, Commentary> {
    commentary.title = commentary.title.trim().replace(/( )+/g, ' ')
    commentary.body = commentary.body.trim().replace(/( )+/g, ' ')

    if (!Commentary.validator(commentary)) {
      return left(new InvalidCommentaryError(commentary))
    }

    return right(new Commentary(commentary))
  }

  get value (): CommentaryData {
    return this.commentary
  }

  static validator (commentary: CommentaryData): boolean {
    if (
      !commentary.title ||
      commentary.title.length < 10 ||
      commentary.title.length > 70
    ) {
      return false
    }

    if (
      !commentary.body ||
      commentary.body.length < 10 ||
      commentary.body.length > 3000
    ) {
      return false
    }

    return true
  }
}
