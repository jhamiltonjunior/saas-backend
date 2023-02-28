import { ITasksData } from '../../domain/entities/tasks/interfaces/tasksData'

export interface ITasksRepository {
  findAllTasks: () => Promise<ITasksData[]>
  findByURL: (url: string) => Promise<ITasksData>
  deleteByURL: (id: string) => Promise<void>
  add: (tasks: ITasksData, id: string) => Promise<void>
  update: (tasks: ITasksData, url: string) => Promise<void>
}
