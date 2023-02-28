import { Router } from 'express'
import { adapterRouteShowTasks } from '../adapters/express/tasks/routeAdapterShowUnique'
import { adapterRouteWithAuthentication } from '../adapters/express/tasks/routeAdapterWithAuthentication'
import { makeCreateTasksController } from '../factories/tasks/create'
import { makeShowUniqueTasksConstroller } from '../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../factories/tasks/showAll'
import { makeDeleteTasksController } from '../factories/tasks/delete'
import { makeUpdateTasksController } from '../factories/tasks/update'

export default (router: Router): void => {
  router.get('/tasks', adapterRouteShowTasks(makeShowAllTasksController()))
  router.get('/tasks/:url', adapterRouteShowTasks(makeShowUniqueTasksConstroller()))

  router.post('/tasks', adapterRouteWithAuthentication(makeCreateTasksController()))

  router.put('/tasks/:url', adapterRouteWithAuthentication(makeUpdateTasksController()))

  router.delete('/tasks/:url', adapterRouteWithAuthentication(makeDeleteTasksController()))
}
