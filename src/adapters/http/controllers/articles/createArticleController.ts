import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { allErrorsArticleResponse } from '../../../../app/useCases/articles/responses/allErrorsArticleResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/articles/validators/author'
import { ArticleUseCases } from 'src/app/useCases/articles/articleUseCases'

export class CreateArticleController {
  private readonly articleUseCases: ArticleUseCases

  constructor (articleUseCases: ArticleUseCases) {
    this.articleUseCases = articleUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    // const url = httpRequest.body.url.trim().replace(/( )+/g, ' ').split(' ').join('-')

    const articleData = {
      title: httpRequest.body.title,
      body: httpRequest.body.body,
      author,
      category: httpRequest.body.category,
      createdAt: new Date(),
      url: httpRequest.body.url,
    }

    try {
      if (
        !httpRequest.body.url ||
        !httpRequest.body.body ||
        !httpRequest.body.title
      ) {
        const field = !httpRequest.body
          ? 'url' ||
        'title'
          : 'author'

        return badRequest(new MissingParamError(field))
      }
      const articleResponse: allErrorsArticleResponse =
        await this.articleUseCases.createArticleOnDatabase(articleData, author)

      if (articleResponse.isLeft()) {
        return badRequest(articleResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return created(httpRequest.body)
  }
}
