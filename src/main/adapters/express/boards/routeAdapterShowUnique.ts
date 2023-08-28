import { Request, Response } from 'express'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueBoardController } from '../../../../adapters/http/controllers/boards/showUniqueBoardController'
import { ShowAllBoardsController } from '../../../../adapters/http/controllers/boards/showAllBoardsController'

export const adapterRouteShowBoards = (
  controller: ShowUniqueBoardController | ShowAllBoardsController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
