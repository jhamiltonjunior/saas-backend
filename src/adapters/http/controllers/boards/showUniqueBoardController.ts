import { BoardsUseCases } from '../../../../app/useCases/boards/boardsUseCases'
import { ShowUniqueResponse } from '../../../../app/useCases/boards/responses/showUniqueResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class ShowUniqueBoardController {
  private readonly boardsUseCases: BoardsUseCases

  constructor (boardsUseCases: BoardsUseCases) {
    this.boardsUseCases = boardsUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const url: string = httpRequest.params.url

    try {
      if (!httpRequest.params) {
        const field = !httpRequest.params ? '' : ' '

        return badRequest(new MissingParamError(field))
      }

      const boardsResponse: ShowUniqueResponse =
        await this.boardsUseCases.showUniqueBoard(url)

      if (boardsResponse.isLeft()) {
        return badRequest(boardsResponse.value)
      }

      httpRequest.body = boardsResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
