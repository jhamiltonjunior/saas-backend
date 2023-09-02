import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { ShowUniqueTasksController } from '../../../adapters/http/controllers/tasks/showUniqueTasksController'
import { PrismaTasksRepository } from '../../../external/database/prisma/tasks/prismaTasksRepository'

export const makeShowUniqueTasksConstroller = (): ShowUniqueTasksController => {
  const tasksRepository = new PrismaTasksRepository()
  const tasksUseCases = new TasksUseCases(tasksRepository)
  const showUniqueTasksController = new ShowUniqueTasksController(tasksUseCases)
  return showUniqueTasksController
}
