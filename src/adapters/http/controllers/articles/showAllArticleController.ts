import { ArticleUseCases } from '../../../../app/useCases/articles/articleUseCases'
import { ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class ShowAllArticleController {
  private readonly articleUseCases: ArticleUseCases

  constructor (articleUseCases: ArticleUseCases) {
    this.articleUseCases = articleUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const articleResponse =
        await this.articleUseCases.showAllArticle()

      httpRequest.body = articleResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
