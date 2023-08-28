import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/boards/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { BoardsUseCases } from '../../../../app/useCases/boards/boardsUseCases'

export class CreateBoardsController {
  private readonly boardsUseCases: BoardsUseCases

  constructor (boardsUseCases: BoardsUseCases) {
    this.boardsUseCases = boardsUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    // const url = httpRequest.body.url.trim().replace(/( )+/g, ' ').split(' ').join('-')

    const boardsData = {
      title: httpRequest.body.title,
      author,
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
      const boardsResponse: allErrorsResponse =
        await this.boardsUseCases.createBoardOnDatabase(boardsData, author)

      if (boardsResponse.isLeft()) {
        return badRequest(boardsResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return created(httpRequest.body)
  }
}
