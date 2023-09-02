import { CreateTasksController } from '../../../adapters/http/controllers/tasks/createTasksController'
import { TasksUseCases } from '../../../app/useCases/tasks/tasksUseCases'
import { PrismaTasksRepository } from '../../../external/database/prisma/tasks/prismaTasksRepository'

export const makeCreateTasksController = (): CreateTasksController => {
  const createTasksRepository = new PrismaTasksRepository()
  const createTasks = new TasksUseCases(createTasksRepository)
  const createTasksController = new CreateTasksController(createTasks)
  return createTasksController
}
