import { ITasksData } from '../../domain/entities/tasks/interfaces/tasksData'

export interface ITasksRepository {
  findAllTasks: () => Promise<ITasksData[]>
  findByURL: (url: string) => Promise<ITasksData | null>
  deleteByURL: (id: string) => Promise<void>
  add: (tasks: ITasksData) => Promise<any>
  update: (tasks: ITasksData, url: string) => Promise<void>
  getUserPermission: (id: string) => Promise<string[]>
}
