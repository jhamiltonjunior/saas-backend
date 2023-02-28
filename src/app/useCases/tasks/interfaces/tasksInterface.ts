import { ITasksRepository } from '../../../repositories/tasksRepository'
import { ITasksData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { allErrorsResponse } from '../responses/allErrorsResponse'
import { DeleteResponse } from '../responses/deleteResponse'
import { ShowUniqueResponse } from '../responses/showUniqueResponse'

export interface TasksInterface {
  tasksRepository: ITasksRepository
  showAllTasks: () => Promise<string | ITasksData[]>
  showUniqueTasks: (urlParams: string) => Promise<ShowUniqueResponse>
  createTasksOnDatabase: (user: ITasksData, author: AuthorData) => Promise<allErrorsResponse>
  deleteTasks: (urlParams: string) => Promise<DeleteResponse>
}
