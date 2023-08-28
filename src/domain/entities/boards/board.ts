import { IBoardsData } from './interfaces/boardsData'
import { InvalidAuthorError } from './errors/invalidAuthor'
import { InvalidCreatedAtError } from './errors/invalidCreatedAt'
import { InvalidTitleError } from './errors/invalidTitle'
import { InvalidURLError } from './errors/invalidURL'
import { InvalidUpdatedAtError } from './errors/invalidUpdatedAt'
import { Either, left, right } from '../../../shared/either'
import { Author } from './validators/author'
import { CreatedAt } from './validators/createdAt'
import { Title } from './validators/title'
import { URL } from './validators/url'
import { UpdatedAt } from './validators/updatedAt'

export class Boards {
  public readonly author: Author
  public readonly createdAt: CreatedAt
  public readonly title: Title
  public readonly url: URL
  public readonly updatedAt?: UpdatedAt
  // public readonly commentary?: Commentary

  constructor (
    title: Title,
    author: Author,
    createdAt: CreatedAt,
    url: URL,
    updatedAt?: UpdatedAt,
    // commentary?: Commentary,
  ) {
    this.author = author
    this.createdAt = createdAt
    this.title = title
    this.url = url
    this.updatedAt = updatedAt
    // this.commentary = commentary

    Object.freeze(this)
  }

  static create (tasks: IBoardsData): Either<
  InvalidTitleError |
  InvalidAuthorError |
  InvalidCreatedAtError |
  InvalidURLError |
  InvalidUpdatedAtError,
  Boards> {
    const authorOrError: Either<InvalidAuthorError, Author> = Author.create(tasks.author)
    const createdAtOrError: Either<InvalidCreatedAtError, CreatedAt> = CreatedAt.create(tasks.createdAt)
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(tasks.title)
    const urlOrError: Either<InvalidURLError, URL> = URL.create(tasks.url)
src/adapters/http/controllers/tasks
    if (authorOrError.isLeft()) {
      return left(authorOrError.value)
    }
    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value)
    }
    if (titleOrError.isLeft()) {
      return left(titleOrError.value)
    }
    if (urlOrError.isLeft()) {
      return left(urlOrError.value)
    }

    const title: Title = titleOrError.value
    const author: Author = authorOrError.value
    const createdAt: CreatedAt = createdAtOrError.value
    const url: URL = urlOrError.value

    return right(new Boards(
      title,
      author,
      createdAt,
      url,
    ))
  }

  static update (tasks: IBoardsData): Either<
  InvalidTitleError |
  InvalidAuthorError |
  InvalidCreatedAtError |
  InvalidURLError |
  InvalidUpdatedAtError,
  Boards> {
    const authorOrError: Either<InvalidAuthorError, Author> = Author.create(tasks.author)
    const createdAtOrError: Either<InvalidCreatedAtError, CreatedAt> = CreatedAt.create(tasks.createdAt)
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(tasks.title)
    const urlOrError: Either<InvalidURLError, URL> = URL.create(tasks.url)
    const updatedAtOrError: Either<InvalidUpdatedAtError, UpdatedAt> = UpdatedAt.create(tasks.updatedAt)
    // const commentaryOrError: Either<InvalidCommentaryError, Commentary> = Commentary.create(tasks.commentary)

    if (authorOrError.isLeft()) {
      return left(authorOrError.value)
    }
    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value)
    }
    if (titleOrError.isLeft()) {
      return left(titleOrError.value)
    }
    if (urlOrError.isLeft()) {
      return left(urlOrError.value)
    }
    if (updatedAtOrError.isLeft()) {
      return left(updatedAtOrError.value)
    }

    const title: Title = titleOrError.value
    const author: Author = authorOrError.value
    const createdAt: CreatedAt = createdAtOrError.value
    const url: URL = urlOrError.value
    const updatedAt: UpdatedAt = updatedAtOrError.value

    return right(new Boards(
      title,
      author,
      createdAt,
      url,
      updatedAt,
    ))
  }
}
