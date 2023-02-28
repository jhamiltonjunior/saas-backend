import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'
import { DeleteTasksController } from '../../../adapters/http/controllers/tasks/deleteTasksController'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'

export const makeDeleteTasksController = (): DeleteTasksController => {
  const deleteTasksRepository = new PostgresTasksRepository(connectionObject)
  const deleteTasks = new TasksUseCases(deleteTasksRepository)
  const deleteTasksController = new DeleteTasksController(deleteTasks)
  return deleteTasksController
}
