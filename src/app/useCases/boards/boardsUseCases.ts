import { Boards } from '../../../domain/entities/boards/board'
import { InvalidAuthorError } from '../../../domain/entities/boards/errors/invalidAuthor'
import { InvalidCreatedAtError } from '../../../domain/entities/boards/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../domain/entities/boards/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../domain/entities/boards/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../domain/entities/boards/errors/invalidURL'
import { URL } from '../../../domain/entities/boards/validators/url'
import { Either, left, right } from '../../../shared/either'
import { IBoardsRepository } from '../../repositories/boardsRepository'
import { IBoardsData } from '../../../domain/entities/boards/interfaces/boardsData'
import { AuthorData } from '../../../domain/entities/boards/validators/author'
import { ShowUniqueResponse } from './responses/showUniqueResponse'
import { allErrorsResponse } from './responses/allErrorsResponse'
import { BoardsInterface } from './interfaces/boardInterface'
import { InvalidURLNotFound } from './errors/invalidURLNotFound'
import { DeleteResponse } from './responses/deleteResponse'
import { InvalidUserDoesNotPermission } from './errors/invalidUserDoesNotPermission'

export class BoardsUseCases implements BoardsInterface {
  boardRepository: IBoardsRepository

  constructor (
    boardsRepository: IBoardsRepository,
  ) {
    this.boardRepository = boardsRepository
  }

  async showAllBoards (): Promise<string | IBoardsData[]> {
    const boards = await this.boardRepository.findAllBoards()

    if (boards === undefined) return 'BoardsNotFound'

    return boards
  }

  async showUniqueBoard (urlParams: string): Promise<ShowUniqueResponse> {
    const urlOrError: Either<InvalidURLError, URL> = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const boards = await this.boardRepository.findByURL(url.value)

    if (boards !== undefined) {
      return right(boards)
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }

  /**
   * The method go create one boards on Database
   * He go verify if exist a URL equal if not exist and the user have permission of writer
   * the boards go be created
   */
  async createBoardOnDatabase (boardsData: IBoardsData, author: AuthorData): Promise<allErrorsResponse> {
    const boardsOrError: Either<
    InvalidTitleError |
    InvalidAuthorError |
    InvalidCreatedAtError |
    InvalidURLError |
    InvalidUpdatedAtError,
    Boards> = Boards.create(boardsData)

    if (boardsOrError.isLeft()) {
      return left(boardsOrError.value)
    }

    const boards: Boards = boardsOrError.value

    // boards.url.value vai enviar a string da url já com o valor formatado
    const result = await this.boardRepository.findByURL(boards.url.value)
    // const permissions = await this.userRepository?.getPermission(boards.author.value.user_id)

    // "reader" is temporary
    // if (permissions?.includes('reader')) {
    if (
      result === undefined
    ) {
      await this.boardRepository.add({
        title: boards.title.value,
        author: boards.author.value,
        url: boards.url.value,
        createdAt: boards.createdAt.value
      },
      String(author.user_id)
      )
      // }
      // Aqui poderia ter um else caso exist uma url igual
    } else {
      return left(new InvalidUserDoesNotPermission(boards.author.value.name))
    }

    return right(boardsData)
  }

  async updateBoard (boardsData: IBoardsData, author: AuthorData, urlParams: string): Promise<allErrorsResponse> {
    const boardsOrError: Either<
    InvalidTitleError |
    InvalidAuthorError |
    InvalidCreatedAtError |
    InvalidURLError |
    InvalidUpdatedAtError,
    Boards> = Boards.create(boardsData)

    if (boardsOrError.isLeft()) {
      return left(boardsOrError.value)
    }

    const boards: Boards = boardsOrError.value

    // boards.url.value vai enviar a string da url já com o valor formatado
    const result = await this.boardRepository.findByURL(urlParams)
    // const permissions = await this.boardsRepository.getPermission(boards.author.value.user_id)

    if (
    // the permission check if user have permission
    // permissions.includes('writer') &&

      // only user who create the boards can edit it
      author.user_id === (<any>result).user_id
    ) {
      if (
        result !== undefined
      ) {
        await this.boardRepository.update({
          /**
           * (<any>result)... this is to maintain the datas
           * case not be actualized with some value
           */

          title: boards.title.value || (<any>result).title,
          author: boards.author.value || (<any>result).author,
          url: boards.url.value || (<any>result).url,

          // this values not necessary
          createdAt: result.createdAt,
          updatedAt: boards.updatedAt?.value
        },
        urlParams
        )
      } else {
        return left(new InvalidURLNotFound(urlParams))
      }
      // Aqui poderia ter um else caso exist uma url igual
    } else {
      return left(new InvalidUserDoesNotPermission(boards.author.value.name))
    }

    return right(boardsData)
  }

  async deleteBoard (urlParams: string): Promise<DeleteResponse> {
    //         adicionar uma camada de validação aqui somentoe usarios com permissa de apagar
    //         ou quem criou a tarefa pode apagar

    const urlOrError = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const boards = await this.boardRepository.findByURL(url.value)

    if (boards !== undefined) {
      this.boardRepository.deleteByURL(boards.url)

      return right('This Boards has been deleted')
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }
}
