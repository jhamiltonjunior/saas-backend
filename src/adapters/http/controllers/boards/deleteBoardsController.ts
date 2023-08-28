import { DeleteResponse } from '../../../../app/useCases/boards/responses/deleteResponse'
import { BoardsUseCases } from '../../../../app/useCases/boards/boardsUseCases'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class DeleteBoardsController {
  private readonly boardsUseCases: BoardsUseCases

  constructor (boardsUseCases: BoardsUseCases) {
    this.boardsUseCases = boardsUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const url: string = httpRequest.params.url

    try {
      // if (!httpRequest.params) {
      //   const field = !httpRequest.params ? '' : ' '

      //   return badRequest(new MissingParamError(field))
      // }

      const boardsResponse: DeleteResponse =
        await this.boardsUseCases.deleteBoard(url)

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
