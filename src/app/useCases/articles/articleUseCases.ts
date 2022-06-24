import { Article } from '../../../domain/entities/articles/article'
import { InvalidAuthorError } from '../../../domain/entities/articles/errors/invalidAuthor'
import { InvalidBodyError } from '../../../domain/entities/articles/errors/invalidBody'
import { InvalidCategoryError } from '../../../domain/entities/articles/errors/invalidCategory'
import { InvalidCreatedAtError } from '../../../domain/entities/articles/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../domain/entities/articles/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../domain/entities/articles/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../domain/entities/articles/errors/invalidURL'
import { URL } from '../../../domain/entities/articles/validators/url'
import { Either, left, right } from '../../../shared/either'
import { IArticleRepository } from '../../repositories/articleRepository'
import { IArticleData } from '../../../domain/entities/articles/interfaces/articleData'
import { AuthorData } from '../../../domain/entities/articles/validators/author'
import { ShowUniqueArticleResponse } from './showUniqueArticleResponse'
import { CreateArticleResponse } from './createArticleResponse'
import { ArticleInterface } from './interfaces/articleInterface'
import { InvalidURLNotFound } from './errors/invalidURLNotFound'
import { IUserRepository } from '../../repositories/userRepository'
import { DeleteArticleResponse } from './responses/deleteArticleResponse'
import { InvalidUserDoesNotPermission } from './errors/invalidUserDoesNotPermission'

export class ArticleUseCases implements ArticleInterface {
  articleRepository: IArticleRepository
  userRepository?: IUserRepository

  constructor (
    articleRepository: IArticleRepository,
    userRepository?: IUserRepository
  ) {
    this.articleRepository = articleRepository
    this.userRepository = userRepository
  }

  async showAllArticle (): Promise<string | IArticleData[]> {
    const article = await this.articleRepository.findAllArticles()

    if (article === undefined) return 'ArticleNotFound'

    return article
  }

  async showUniqueArticle (urlParams: string): Promise<ShowUniqueArticleResponse> {
    const urlOrError: Either<InvalidURLError, URL> = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const article = await this.articleRepository.findByURL(url.value)

    // isso é feito para que eu possa acessar o id do usuário
    // pelo article não estava sendo possivel, mas existe maneira melhor de fazer isso
    const userId: any = article

    if (this.userRepository) {
      const user = await this.userRepository.findUserById(userId.user_id)

      article.author = user
    }

    if (article !== undefined) {
      return right(article)
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }

  /**
   * The method go create one article on Database
   * He go verify if exist a URL equal if not exist and the user have permission of writer
   * the article go be created
   */
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
    const permissions = await this.userRepository?.getPermission(article.author.value.user_id)

    if (permissions?.includes('writer')) {
      if (
        result === undefined
      ) {
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
      // Aqui poderia ter um else caso exist uma url igual
    } else {
      return left(new InvalidUserDoesNotPermission(article.author.value.name))
    }

    return right(articleData)
  }

  async deleteArticle (urlParams: string): Promise<DeleteArticleResponse> {
    const urlOrError = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const article = await this.articleRepository.findByURL(url.value)

    if (article !== undefined) {
      this.articleRepository.deleteByURL(article.url)

      return right('This Article has been deleted')
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }
}
