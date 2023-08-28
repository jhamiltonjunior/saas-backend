import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/boards/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/boards/validators/author'
import { BoardsUseCases } from '../../../../app/useCases/boards/boardsUseCases'

export class UpdateBoardsController {
  private readonly boardsUseCases: BoardsUseCases

  constructor (boardsUseCases: BoardsUseCases) {
    this.boardsUseCases = boardsUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    const urlOfParams: string = httpRequest.params.url
    const date = new Date()

    const boardsData = {
      title: httpRequest.body.title,
      body: httpRequest.body.body,
      author,
      category: httpRequest.body.category,
      createdAt: date,
      updatedAt: date,
      url: httpRequest.body.url,
    }

    console.log(boardsData)

    try {
      if (Object.keys(httpRequest.body).length < 1) {
        const field = !httpRequest.body
          ? 'url' ||
        'title' ||
        'author'
          : 'category'

        return badRequest(new MissingParamError(field))
      }
      const boardsResponse: allErrorsResponse =
        await this.boardsUseCases.updateBoard(boardsData, author, urlOfParams)

      if (boardsResponse.isLeft()) {
        return badRequest(boardsResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return ok(httpRequest.body)
  }
}
