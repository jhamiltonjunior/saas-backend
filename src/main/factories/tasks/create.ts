import { CreateTasksController } from '../../../adapters/http/controllers/tasks/createTasksController'
import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'
import { TasksUseCases } from '@useCases/tasks/tasksUseCases'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeCreateTasksController = (): CreateTasksController => {
  const createTasksRepository = new PostgresTasksRepository(connectionObject)
  const createTasks = new TasksUseCases(createTasksRepository, userRepository)
  const createTasksController = new CreateTasksController(createTasks)
  return createTasksController
}
