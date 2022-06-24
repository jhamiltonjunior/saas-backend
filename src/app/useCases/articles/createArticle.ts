import { Article } from '../../../domain/entities/articles/article'
import { InvalidAuthorError } from '../../../domain/entities/articles/errors/invalidAuthor'
import { InvalidBodyError } from '../../../domain/entities/articles/errors/invalidBody'
import { InvalidCategoryError } from '../../../domain/entities/articles/errors/invalidCategory'
import { InvalidCreatedAtError } from '../../../domain/entities/articles/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../domain/entities/articles/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../domain/entities/articles/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../domain/entities/articles/errors/invalidURL'
import { IArticleData } from '../../../domain/entities/articles/interfaces/articleData'
import { AuthorData } from '../../../domain/entities/articles/validators/author'
import { IArticleRepository } from '../../repositories/articleRepository'
import { IUserRepository } from '../../repositories/userRepository'
import { Either, left, right } from '../../../shared/either'
import { CreateArticleResponse } from './createArticleResponse'
import { ICreateArticle } from './interfaces/createArticle'

export class CreateArticle implements ICreateArticle {
  public readonly articleRepository: IArticleRepository
  public readonly userRepository: IUserRepository

  constructor (
    articleRepository: IArticleRepository,
    userRepository: IUserRepository
  ) {
    this.articleRepository = articleRepository
    this.userRepository = userRepository
  }

  async createArticleOnDatabase (articleData: IArticleData, author: AuthorData): Promise<CreateArticleResponse> {
    const articleOrError: Either<
    InvalidTitleError |
    InvalidBodyError |
    InvalidAuthorError |
    InvalidCategoryError |
    InvalidCreatedAtError |
    InvalidURLError |
    InvalidUpdatedAtError,
    Article> = Article.create(articleData)

    if (articleOrError.isLeft()) {
      return left(articleOrError.value)
    }
    const article: Article = articleOrError.value

    // article.url.value vai enviar a string da url já com o valor formatado
    const result = await this.articleRepository.findByURL(article.url.value)

    /**
     * Create article if not exist url equal
     * if not exist url create the article
    */
    if (result === undefined) {
      await this.articleRepository.add({
        title: article.title.value,
        author: article.author.value,
        body: article.body.value,
        url: article.url.value,
        category: article.category.value,
        createdAt: article.createdAt.value
      },
      String(author.user_id)
      )
    }

    return right(articleData)
  }
}
