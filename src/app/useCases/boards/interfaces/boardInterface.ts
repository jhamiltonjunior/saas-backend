import { IBoardsRepository } from '../../../repositories/boardsRepository'
import { IBoardsData } from '../../../../domain/entities/boards/interfaces/boardsData'
import { AuthorData } from '../../../../domain/entities/boards/validators/author'
import { allErrorsResponse } from '../responses/allErrorsResponse'
import { DeleteResponse } from '../responses/deleteResponse'
import { ShowUniqueResponse } from '../responses/showUniqueResponse'

export interface BoardsInterface {
  boardRepository: IBoardsRepository
  showAllBoards: () => Promise<string | IBoardsData[]>
  showUniqueBoard: (urlParams: string) => Promise<ShowUniqueResponse>
  createBoardOnDatabase: (user: IBoardsData, author: AuthorData) => Promise<allErrorsResponse>
  deleteBoard: (urlParams: string) => Promise<DeleteResponse>
}
