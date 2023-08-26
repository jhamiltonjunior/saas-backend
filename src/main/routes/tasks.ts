import { Router } from 'express'
import { adapterRouteShowTasks } from '../adapters/express/tasks/routeAdapterShowUnique'
import { adapterRouteWithAuthentication } from '../adapters/express/tasks/routeAdapterWithAuthentication'
import { makeCreateTasksController } from '../factories/tasks/create'
import { makeShowUniqueTasksConstroller } from '../factories/tasks/showUnique'
import { makeShowAllTasksController } from '../factories/tasks/showAll'
import { makeDeleteTasksController } from '../factories/tasks/delete'
import { makeUpdateTasksController } from '../factories/tasks/update'
import { auth } from '../middleware/express/authOnly'

export default (router: Router): void => {
  router.get('/tasks', adapterRouteShowTasks(makeShowAllTasksController()))
  router.get('/tasks/find/:url', adapterRouteShowTasks(makeShowUniqueTasksConstroller()))

  router.post('/tasks/create', adapterRouteWithAuthentication(makeCreateTasksController()))

  router.post('/tasks/verify', auth, (_, res) => res.status(200).json({ message: 'ok' }))

  router.put('/tasks/edit/:url', adapterRouteWithAuthentication(makeUpdateTasksController()))

  router.delete('/tasks/delete/:url', adapterRouteWithAuthentication(makeDeleteTasksController()))
}
