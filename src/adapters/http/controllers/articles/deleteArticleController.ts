import { DeleteArticleResponse } from '../../../../app/useCases/articles/responses/deleteArticleResponse'
import { ArticleUseCases } from '../../../../app/useCases/articles/articleUseCases'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class DeleteArticleController {
  private readonly articleUseCases: ArticleUseCases

  constructor (articleUseCases: ArticleUseCases) {
    this.articleUseCases = articleUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const url: string = httpRequest.params.url

    try {
      // if (!httpRequest.params) {
      //   const field = !httpRequest.params ? '' : ' '

      //   return badRequest(new MissingParamError(field))
      // }

      const articleResponse: DeleteArticleResponse =
        await this.articleUseCases.deleteArticle(url)

      if (articleResponse.isLeft()) {
        return badRequest(articleResponse.value)
      }

      httpRequest.body = articleResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
