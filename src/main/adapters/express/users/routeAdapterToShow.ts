import { Request, Response } from 'express'

import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
import { ShowUserController } from '../../../adapters/http/controllers/users/showUserController'

export const routeAdapterToShowUser = (controller:
  ShowUserController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode)
      .json(httpResponse)
  }
}
