import { ShowAllTasksController } from '../../../adapters/http/controllers/tasks/showAllTasksController'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'

export const makeShowAllTasksController = (): ShowAllTasksController => {
  const tasksRepository = new PostgresTasksRepository(connectionObject)
  const tasksUseCases = new TasksUseCases(tasksRepository)
  const showAllTasksController = new ShowAllTasksController(tasksUseCases)
  return showAllTasksController
}
