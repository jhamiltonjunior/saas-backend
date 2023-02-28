import { ITasksData } from './interfaces/tasksData'
import { InvalidAuthorError } from './errors/invalidAuthor'
import { InvalidBodyError } from './errors/invalidBody'
import { InvalidCategoryError } from './errors/invalidCategory'
import { InvalidCreatedAtError } from './errors/invalidCreatedAt'
import { InvalidTitleError } from './errors/invalidTitle'
import { InvalidURLError } from './errors/invalidURL'
import { InvalidUpdatedAtError } from './errors/invalidUpdatedAt'
import { Either, left, right } from '../../../shared/either'
import { Author } from './validators/author'
import { Body } from './validators/body'
import { Category } from './validators/category'
import { CreatedAt } from './validators/createdAt'
import { Title } from './validators/title'
import { URL } from './validators/url'
import { UpdatedAt } from './validators/updatedAt'

export class Tasks {
  public readonly author: Author
  public readonly body: Body
  public readonly category: Category
  public readonly createdAt: CreatedAt
  public readonly title: Title
  public readonly url: URL
  public readonly updatedAt?: UpdatedAt
  // public readonly commentary?: Commentary

  constructor (
    title: Title,
    body: Body,
    author: Author,
    category: Category,
    createdAt: CreatedAt,
    url: URL,
    updatedAt?: UpdatedAt,
    // commentary?: Commentary,
  ) {
    this.author = author
    this.body = body
    this.category = category
    this.createdAt = createdAt
    this.title = title
    this.url = url
    this.updatedAt = updatedAt
    // this.commentary = commentary

    Object.freeze(this)
  }

  static create (tasks: ITasksData): Either<
  InvalidTitleError |
  InvalidBodyError |
  InvalidAuthorError |
  InvalidCategoryError |
  InvalidCreatedAtError |
  InvalidURLError |
  InvalidUpdatedAtError,
  Tasks> {
    const authorOrError: Either<InvalidAuthorError, Author> = Author.create(tasks.author)
    const bodyOrError: Either<InvalidBodyError, Body> = Body.create(tasks.body)
    const categoryOrError: Either<InvalidCategoryError, Category> = Category.create(tasks.category)
    const createdAtOrError: Either<InvalidCreatedAtError, CreatedAt> = CreatedAt.create(tasks.createdAt)
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(tasks.title)
    const urlOrError: Either<InvalidURLError, URL> = URL.create(tasks.url)
    // const commentaryOrError: Either<InvalidCommentaryError, Commentary> = Commentary.create(tasks.commentary)

    if (authorOrError.isLeft()) {
      return left(authorOrError.value)
    }
    if (bodyOrError.isLeft()) {
      return left(bodyOrError.value)
    }
    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value)
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
    const body: Body = bodyOrError.value
    const author: Author = authorOrError.value
    const category: Category = categoryOrError.value
    const createdAt: CreatedAt = createdAtOrError.value
    const url: URL = urlOrError.value

    return right(new Tasks(
      title,
      body,
      author,
      category,
      createdAt,
      url,
    ))
  }

  static update (tasks: ITasksData): Either<
  InvalidTitleError |
  InvalidBodyError |
  InvalidAuthorError |
  InvalidCategoryError |
  InvalidCreatedAtError |
  InvalidURLError |
  InvalidUpdatedAtError,
  Tasks> {
    const authorOrError: Either<InvalidAuthorError, Author> = Author.create(tasks.author)
    const bodyOrError: Either<InvalidBodyError, Body> = Body.create(tasks.body)
    const categoryOrError: Either<InvalidCategoryError, Category> = Category.create(tasks.category)
    const createdAtOrError: Either<InvalidCreatedAtError, CreatedAt> = CreatedAt.create(tasks.createdAt)
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(tasks.title)
    const urlOrError: Either<InvalidURLError, URL> = URL.create(tasks.url)
    const updatedAtOrError: Either<InvalidUpdatedAtError, UpdatedAt> = UpdatedAt.create(tasks.updatedAt)
    // const commentaryOrError: Either<InvalidCommentaryError, Commentary> = Commentary.create(tasks.commentary)

    if (authorOrError.isLeft()) {
      return left(authorOrError.value)
    }
    if (bodyOrError.isLeft()) {
      return left(bodyOrError.value)
    }
    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value)
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
    const body: Body = bodyOrError.value
    const author: Author = authorOrError.value
    const category: Category = categoryOrError.value
    const createdAt: CreatedAt = createdAtOrError.value
    const url: URL = urlOrError.value
    const updatedAt: UpdatedAt = updatedAtOrError.value

    return right(new Tasks(
      title,
      body,
      author,
      category,
      createdAt,
      url,
      updatedAt,
    ))
  }
}
