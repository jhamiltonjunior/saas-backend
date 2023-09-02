import { ITasksData, ITasksUpdateData } from './interfaces/tasksData'
import { InvalidAuthorError } from './errors/invalidAuthor'
import { InvalidBodyError } from './errors/invalidBody'
import { InvalidCategoryError } from './errors/invalidCategory'
import { InvalidCreatedAtError } from './errors/invalidCreatedAt'
import { InvalidTitleError } from './errors/invalidTitle'
import { InvalidURLError } from './errors/invalidURL'
import { InvalidUpdatedAtError } from './errors/invalidUpdatedAt'
import { Either, left, right } from '../../../shared/either'
import { Author } from './validators/author'
import { Description } from './validators/description'
import { Category } from './validators/category'
import { CreatedAt } from './validators/createdAt'
import { Title } from './validators/title'
import { URL } from './validators/url'
import { UpdatedAt } from './validators/updatedAt'

export class Tasks {
  public readonly author: Author
  public readonly description?: Description | null
  public readonly tag?: Category | null
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
    description?: Description | undefined,
    tag?: Category | null,
    updatedAt?: UpdatedAt,
    // commentary?: Commentary,
  ) {
    this.author = author
    this.description = description || undefined
    this.tag = tag || undefined
    this.createdAt = createdAt
    this.title = title
    this.url = url
    this.updatedAt = updatedAt

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
    const authorOrError: Either<InvalidAuthorError, Author> = Author.create(tasks.user_id)
    const bodyOrError: Either<InvalidBodyError, Description> | undefined =
      tasks.description !== null ? Description.create(tasks.description) : undefined
    const tagOrError: Either<InvalidCategoryError, Category> | undefined =
    tasks.tag !== null ? Category.create(tasks.tag) : undefined
    const createdAtOrError: Either<InvalidCreatedAtError, CreatedAt> = CreatedAt.create(tasks.created_at)
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(tasks.title)
    const urlOrError: Either<InvalidURLError, URL> = URL.create(tasks.url)

    if (authorOrError.isLeft()) {
      return left(authorOrError.value)
    }
    if (bodyOrError !== undefined && bodyOrError.isLeft()) {
      return left(bodyOrError.value)
    }
    if (tagOrError !== undefined && tagOrError.isLeft()) {
      return left(tagOrError.value)
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
    const description: Description | undefined = bodyOrError?.value
    const author: Author = authorOrError.value
    const tag: Category | undefined = tagOrError?.value
    const createdAt: CreatedAt = createdAtOrError.value
    const url: URL = urlOrError.value

    return right(new Tasks(
      title,
      author,
      createdAt,
      url,
      description,
      tag,
    ))
  }
}

export class TasksUpdate {
  public readonly description?: Description | null
  public readonly tag?: Category | null
  public readonly title?: Title
  public readonly url?: URL
  public readonly updatedAt: UpdatedAt
  // public readonly commentary?: Commentary

  constructor (
    updatedAt: UpdatedAt,
    title?: Title,
    url?: URL,
    description?: Description | undefined,
    tag?: Category | null,
    // commentary?: Commentary,
  ) {
    this.updatedAt = updatedAt
    this.description = description || undefined
    this.tag = tag || undefined
    this.title = title || undefined
    this.url = url || undefined

    Object.freeze(this)
  }

  static update (tasks: ITasksUpdateData): Either<
  InvalidTitleError |
  InvalidBodyError |
  InvalidAuthorError |
  InvalidCategoryError |
  InvalidCreatedAtError |
  InvalidURLError |
  InvalidUpdatedAtError,
  TasksUpdate> {
    const bodyOrError: Either<InvalidBodyError, Description> | undefined =
      tasks.description !== undefined ? Description.create(tasks.description) : undefined

    const categoryOrError: Either<InvalidCategoryError, Category> | undefined =
      tasks.tag !== undefined ? Category.create(tasks.tag) : undefined

    const titleOrError: Either<InvalidTitleError, Title> | undefined =
      tasks.title !== undefined ? Title.create(tasks.title) : undefined

    const urlOrError: Either<InvalidURLError, URL> | undefined =
      tasks.url !== undefined ? URL.create(tasks.url) : undefined
    const updatedAtOrError: Either<InvalidUpdatedAtError, UpdatedAt> = UpdatedAt.create(tasks.updated_at)

    if (bodyOrError && bodyOrError.isLeft()) {
      return left(bodyOrError.value)
    }
    if (categoryOrError && categoryOrError.isLeft()) {
      return left(categoryOrError.value)
    }
    if (titleOrError && titleOrError.isLeft()) {
      return left(titleOrError.value)
    }
    if (urlOrError && urlOrError.isLeft()) {
      return left(urlOrError.value)
    }
    if (updatedAtOrError.isLeft()) {
      return left(updatedAtOrError.value)
    }

    const title: Title | undefined = titleOrError?.value
    const description: Description | undefined = bodyOrError?.value
    const tag: Category | undefined = categoryOrError?.value
    const url: URL | undefined = urlOrError?.value
    const updatedAt: UpdatedAt = updatedAtOrError?.value

    return right(new TasksUpdate(
      updatedAt,
      title,
      url,
      description,
      tag,
    ))
  }
}
