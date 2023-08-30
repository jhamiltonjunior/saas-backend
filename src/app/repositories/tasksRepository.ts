import { ITasksData } from '../../domain/entities/tasks/interfaces/tasksData'

export interface ITasksRepository {
  findAllTasks: () => Promise<ITasksData[]>
  findByURL: (url: string) => Promise<ITasksData>
  deleteByURL: (id: string) => Promise<void>
  add: (tasks: ITasksData, id: string, boardsId: string) => Promise<void>
  update: (tasks: ITasksData, url: string) => Promise<void>
  getPermission: (id: string) => Promise<string[]>
}
