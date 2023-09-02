import { DeleteTasksController } from '../../../adapters/http/controllers/tasks/deleteTasksController'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { PrismaTasksRepository } from '../../../external/database/prisma/tasks/prismaTasksRepository'

export const makeDeleteTasksController = (): DeleteTasksController => {
  const deleteTasksRepository = new PrismaTasksRepository()
  const deleteTasks = new TasksUseCases(deleteTasksRepository)
  const deleteTasksController = new DeleteTasksController(deleteTasks)
  return deleteTasksController
}
