import { IncomingMessage, ServerResponse } from 'http'

import { adapterRouteShowTasks } from '../../adapters/node/tasks/routeAdapterShowUnique'
// import { adapterRouteWithAuthentication } from '../../adapters/express/tasks/routeAdapterWithAuthentication'
// import { makeCreateTasksController } from '../../factories/tasks/create'
import { makeShowUniqueTasksConstroller } from '../../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../../factories/tasks/showAll'
// import { makeDeleteTasksController } from '../../factories/tasks/delete'
// import { makeUpdateTasksController } from '../../factories/tasks/update'

const handler = (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200)
  response.end(`${response.statusCode}`)
}

export default async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  if (request.url === '/' && request.method === 'GET') {
    return handler(request, response)
  }

  if (request.url === '/tasks' && request.method === 'GET') {
    // response.end('ok')
    await adapterRouteShowTasks(
      makeShowAllTasksController(),
      request, response
    )
    return
  }

  // if (request.url === '/tasks/:url' && request.method === 'GET') {
  //   adapterRouteShowTasks(
  //     makeShowUniqueTasksConstroller()
  //     // request, response
  //   )
  //   response.end('ok')
  //   return
  // }

  if (response.statusCode === 404) {
    response.end('This Page does not exist!')
  }
}
