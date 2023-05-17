import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueTasksController } from '../../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { ShowAllTasksController } from '../../../../adapters/http/controllers/tasks/showAllTasksController'

export const adapterRouteShowTasks = (
  controller: ShowUniqueTasksController | ShowAllTasksController
): any => {
  return async (request: IncomingMessage, response: ServerResponse) => {
    const query = request.url ? parse(request.url, true) : false

    console.log(query)

    const httpRequest: IHttpRequest = {
      params: query
    }

    const httpResponse = await controller.handle(httpRequest)

    response.writeHead(httpResponse.statusCode)
    response.write(httpResponse.body)
  }
}
