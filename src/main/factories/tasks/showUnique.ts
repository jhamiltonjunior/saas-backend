import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { PostgresTasksRepository } from '../../../external/database/postgreSQL/tasks/postgresTasksRepository'
import { ShowUniqueTasksController } from '../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeShowUniqueTasksConstroller = (): ShowUniqueTasksController => {
  const tasksRepository = new PostgresTasksRepository(connectionObject)
  const tasksUseCases = new TasksUseCases(tasksRepository, userRepository)
  const showUniqueTasksController = new ShowUniqueTasksController(tasksUseCases)
  return showUniqueTasksController
}
