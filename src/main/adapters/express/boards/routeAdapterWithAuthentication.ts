import { Request, Response } from 'express'
import { validateUser } from '../../../../external/jwt/jwt'

import { CreateBoardsController } from '../../../../adapters/http/controllers/boards/createBoardsController'
import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { DeleteBoardsController } from '../../../../adapters/http/controllers/boards/deleteBoardsController'
import { UpdateBoardsController } from '../../../../adapters/http/controllers/boards/updateBoardsController'

export const adapterRouteWithAuthentication = (
  controller:
  CreateBoardsController |
  UpdateBoardsController |
  DeleteBoardsController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const authHeaders = req.headers.authorization

    if (authHeaders === undefined) {
      res.status(401).json({ message: 'Token error' })
      return
    }

    const parts = authHeaders.split(' ')

    if (parts.length !== 2) { res.status(401).json({ message: 'Token error' }) }

    const [, token] = parts

    const id = validateUser(token)

    const httpResponse = await controller.handle(httpRequest, id)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
