import { IncomingMessage, ServerResponse } from 'http'

import { adapterRouteShowTasks } from '../../adapters/node/tasks/routeAdapterShowUnique'
// import { adapterRouteWithAuthentication } from '../../adapters/express/tasks/routeAdapterWithAuthentication'
// import { makeCreateTasksController } from '../../factories/tasks/create'
// import { makeShowUniqueTasksConstroller } from '../../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../../factories/tasks/showAll'
// import { makeDeleteTasksController } from '../../factories/tasks/delete'
// import { makeUpdateTasksController } from '../../factories/tasks/update'

const BASE_URL = '/api'

const handler = (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200)
  response.end(`${response.statusCode}`)
}

export default async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  if (request.url === `${BASE_URL}/` && request.method === 'GET') {
    return handler(request, response)
  }

  if (request.url === `${BASE_URL}/tasks` && request.method === 'GET') {
    await adapterRouteShowTasks(
      makeShowAllTasksController(),
      request, response
    )
  }

  if (request.url === `${BASE_URL}/tasks/register` && request.method === 'POST') {
    return handler(request, response)
  }

  if (request.url === `${BASE_URL}/tasks/auth` && request.method === 'POST') {
    return handler(request, response)
  } else {
    response.statusCode = 404
    response.end()
  }
  // if (request.url === '/tasks/:url' && request.method === 'GET') {
  //   adapterRouteShowTasks(
  //     makeShowUniqueTasksConstroller()
  //     // request, response
  //   )
  //   response.end('ok')
  //   return
  // }
}
