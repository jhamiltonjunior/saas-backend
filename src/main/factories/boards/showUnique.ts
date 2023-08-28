import { BoardsUseCases } from '../../../app/useCases/boards/boardsUseCases'
import { PostgresBoardsRepository } from '../../../external/database/postgreSQL/boards/postgresBoardsRepository'
import { ShowUniqueBoardController } from '../../../adapters/http/controllers/boards/showUniqueBoardController'
import { connectionObject } from '../utils/connectionObject'

export const makeShowUniqueBoardsConstroller = (): ShowUniqueBoardController => {
  const boardsRepository = new PostgresBoardsRepository(connectionObject)
  const boardsUseCases = new BoardsUseCases(boardsRepository)
  const showUniqueBoardsController = new ShowUniqueBoardController(boardsUseCases)
  return showUniqueBoardsController
}
