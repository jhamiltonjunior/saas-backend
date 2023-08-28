import { CreateBoardsController } from '../../../adapters/http/controllers/boards/createBoardsController'
import { PostgresBoardsRepository } from '../../../external/database/postgreSQL/boards/postgresBoardsRepository'
import { connectionObject } from '../utils/connectionObject'
import { BoardsUseCases } from '../../../app/useCases/boards/boardsUseCases'

export const makeCreateBoardsController = (): CreateBoardsController => {
  const createBoardsRepository = new PostgresBoardsRepository(connectionObject)
  const createBoards = new BoardsUseCases(createBoardsRepository)
  const createBoardsController = new CreateBoardsController(createBoards)
  return createBoardsController
}
