import { BoardsUseCases } from '../../../../app/useCases/boards/boardsUseCases'
import { ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class ShowAllBoardsController {
  private readonly boardsUseCases: BoardsUseCases

  constructor (boardsUseCases: BoardsUseCases) {
    this.boardsUseCases = boardsUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const boardsResponse =
        await this.boardsUseCases.showAllBoards()

      httpRequest.body = boardsResponse
    } catch (error) {
      console.log(error)
      httpRequest.body = 'Internal Server Error'
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
