import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { UpdateTasksController } from '../../../adapters/http/controllers/tasks/updateTasksController'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeUpdateTasksController = (): UpdateTasksController => {
  const updateTasksRepository = new PostgresTasksRepository(connectionObject)
  const updateTasks = new TasksUseCases(updateTasksRepository, userRepository)
  const updateTasksController = new UpdateTasksController(updateTasks)
  return updateTasksController
}
