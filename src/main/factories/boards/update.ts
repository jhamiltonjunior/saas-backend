import { PostgresBoardsRepository } from '../../../external/database/postgreSQL/boards/postgresBoardsRepository'
import { connectionObject } from '../utils/connectionObject'
import { BoardsUseCases } from '../../../app/useCases/boards/boardsUseCases'
import { UpdateBoardsController } from '../../../adapters/http/controllers/boards/updateBoardsController'

export const makeUpdateBoardsController = (): UpdateBoardsController => {
  const updateBoardsRepository = new PostgresBoardsRepository(connectionObject)
  const updateBoards = new BoardsUseCases(updateBoardsRepository)
  const updateBoardsController = new UpdateBoardsController(updateBoards)
  return updateBoardsController
}
