import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueTasksController } from '../../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { ShowAllTasksController } from '../../../../adapters/http/controllers/tasks/showAllTasksController'

export const adapterRouteShowTasks = async (
  controller: ShowUniqueTasksController | ShowAllTasksController,
  request: IncomingMessage, response: ServerResponse
): Promise<any> => {
  const query = request.url ? parse(request.url, true) : false
  const httpRequest: IHttpRequest = {
    params: query
  }

  // O erro esta acontecendo por causa da conexao com o banco de dados

  const httpResponse = await controller.handle(httpRequest)
  console.log(httpResponse)

  response.writeHead(httpResponse.statusCode)

  if (httpResponse.body.legth <= 1) response.write(httpResponse.body)

  response.end()
}
