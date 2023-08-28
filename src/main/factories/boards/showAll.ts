import { ShowAllBoardsController } from '../../../adapters/http/controllers/boards/showAllBoardsController'
import { BoardsUseCases } from '../../../app/useCases/boards/boardsUseCases'
import { PostgresBoardsRepository } from '../../../external/database/postgreSQL/boards/postgresBoardsRepository'
import { connectionObject } from '../utils/connectionObject'

export const makeShowAllBoardsController = (): ShowAllBoardsController => {
  const boardsRepository = new PostgresBoardsRepository(connectionObject)
  const boardsUseCases = new BoardsUseCases(boardsRepository)
  const showAllBoardsController = new ShowAllBoardsController(boardsUseCases)
  return showAllBoardsController
}
