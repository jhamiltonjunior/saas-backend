import { Request, Response } from 'express'

import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
import { UpdateUserController } from '../../../adapters/http/controllers/users/updateController'

export const routeAdapterToUpdate = (controller:
  UpdateUserController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode)
      .json(httpResponse)
  }
}
