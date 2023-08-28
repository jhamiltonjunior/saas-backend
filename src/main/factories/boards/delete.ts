import { PostgresBoardsRepository } from '../../../external/database/postgreSQL/boards/postgresBoardsRepository'
import { connectionObject } from '../utils/connectionObject'
import { DeleteBoardsController } from '../../../adapters/http/controllers/boards/deleteBoardsController'
import { BoardsUseCases } from '../../../app/useCases/boards/boardsUseCases'

export const makeDeleteBoardsController = (): DeleteBoardsController => {
  const deleteBoardsRepository = new PostgresBoardsRepository(connectionObject)
  const deleteBoards = new BoardsUseCases(deleteBoardsRepository)
  const deleteBoardsController = new DeleteBoardsController(deleteBoards)
  return deleteBoardsController
}
