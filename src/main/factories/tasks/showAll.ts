import { PrismaTasksRepository } from '../../..//external/database/prisma/tasks/prismaTasksRepository'
import { ShowAllTasksController } from '../../../adapters/http/controllers/tasks/showAllTasksController'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'

export const makeShowAllTasksController = (): ShowAllTasksController => {
  const tasksRepository = new PrismaTasksRepository()
  const tasksUseCases = new TasksUseCases(tasksRepository)
  const showAllTasksController = new ShowAllTasksController(tasksUseCases)
  return showAllTasksController
}
