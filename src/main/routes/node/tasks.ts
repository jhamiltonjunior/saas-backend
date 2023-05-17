import { IncomingMessage } from 'http'

import { adapterRouteShowTasks } from '../../adapters/node/tasks/routeAdapterShowUnique'
// import { adapterRouteWithAuthentication } from '../../adapters/express/tasks/routeAdapterWithAuthentication'
// import { makeCreateTasksController } from '../../factories/tasks/create'
import { makeShowUniqueTasksConstroller } from '../../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../../factories/tasks/showAll'
// import { makeDeleteTasksController } from '../../factories/tasks/delete'
// import { makeUpdateTasksController } from '../../factories/tasks/update'

export default (request: IncomingMessage /* , response: ServerResponse */): void => {
  if (request.url === '/tasks' && request.method === 'GET') {
    adapterRouteShowTasks(makeShowAllTasksController())
  }

  if (request.url === '/tasks/:url' && request.method === 'GET') {
    adapterRouteShowTasks(makeShowUniqueTasksConstroller())
  }

  // if (request.url === '/tasks' && request.method === 'POST') {
  // }

  // if (request.url === '/tasks/:url' && request.method === 'PUT') {
  // }

  // if (request.url === '/tasks/:url' && request.method === 'DELETE') {
  // }
}
