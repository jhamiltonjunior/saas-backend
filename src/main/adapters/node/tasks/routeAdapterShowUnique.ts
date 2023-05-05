import { ClientRequest, ServerResponse } from 'node:http'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueTasksController } from '../../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { ShowAllTasksController } from '../../../../adapters/http/controllers/tasks/showAllTasksController'

export const adapterRouteShowTasks = (
  controller: ShowUniqueTasksController | ShowAllTasksController
): any => {
  return async (req: ClientRequest, res: ServerResponse) => {
    const httpRequest: IHttpRequest = {
      params: req
    }

    const httpResponse = await controller.handle(httpRequest)

    res.setHeader(httpResponse.statusCode).json(httpResponse.body)
    res.set
  }
}
