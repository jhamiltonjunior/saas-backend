import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { UpdateTasksController } from '../../../adapters/http/controllers/tasks/updateTasksController'

export const makeUpdateTasksController = (): UpdateTasksController => {
  const updateTasksRepository = new PostgresTasksRepository(connectionObject)
  const updateTasks = new TasksUseCases(updateTasksRepository)
  const updateTasksController = new UpdateTasksController(updateTasks)
  return updateTasksController
}
