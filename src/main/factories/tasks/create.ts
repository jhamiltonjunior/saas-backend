import { CreateTasksController } from '../../../adapters/http/controllers/tasks/createTasksController'
import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'

export const makeCreateTasksController = (): CreateTasksController => {
  const createTasksRepository = new PostgresTasksRepository(connectionObject)
  const createTasks = new TasksUseCases(createTasksRepository)
  const createTasksController = new CreateTasksController(createTasks)
  return createTasksController
}
