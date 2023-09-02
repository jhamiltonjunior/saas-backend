import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { UpdateTasksController } from '../../../adapters/http/controllers/tasks/updateTasksController'
import { PrismaTasksRepository } from '../../../external/database/prisma/tasks/prismaTasksRepository'

export const makeUpdateTasksController = (): UpdateTasksController => {
  const updateTasksRepository = new PrismaTasksRepository()
  const updateTasks = new TasksUseCases(updateTasksRepository)
  const updateTasksController = new UpdateTasksController(updateTasks)
  return updateTasksController
}
