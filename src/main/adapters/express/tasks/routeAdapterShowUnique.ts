import { Request, Response } from 'express'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueTasksController } from '../../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { ShowAllTasksController } from 'src/adapters/http/controllers/tasks/showAllTasksController'

export const adapterRouteShowTasks = (
  controller: ShowUniqueTasksController | ShowAllTasksController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
