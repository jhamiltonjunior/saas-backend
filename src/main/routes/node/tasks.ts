import { IncomingMessage, ServerResponse } from 'http'

import { adapterRouteShowTasks } from '../../adapters/express/tasks/routeAdapterShowUnique'
import { adapterRouteWithAuthentication } from '../../adapters/express/tasks/routeAdapterWithAuthentication'
import { makeCreateTasksController } from '../../factories/tasks/create'
import { makeShowUniqueTasksConstroller } from '../../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../../factories/tasks/showAll'
import { makeDeleteTasksController } from '../../factories/tasks/delete'
import { makeUpdateTasksController } from '../../factories/tasks/update'

export default (request: IncomingMessage, response: ServerResponse): void => {
  if (request.url === '/tasks' && request.method === 'GET') {
    response.writeHead(200)
    response.end(`${response.statusCode}`)
  }

  if (request.url === '/tasks/:url' && request.method === 'GET') {
    response.writeHead(200)
    response.end(`${response.statusCode}`)
  }

  if (request.url === '/tasks' && request.method === 'POST') {
    response.writeHead(201)
    response.end(`${response.statusCode}`)
  }

  if (request.url === '/tasks/:url' && request.method === 'PUT') {
    response.writeHead(200)
    response.end(`${response.statusCode}`)
  }

  if (request.url === '/tasks/:url' && request.method === 'DELETE') {
    response.writeHead(200)
    response.end(`${response.statusCode}`)
  }
}
