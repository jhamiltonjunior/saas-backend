import { IBoardsData } from '../../domain/entities/boards/interfaces/boardsData'

export interface IBoardsRepository {
  findAllBoards: () => Promise<IBoardsData[]>
  findByURL: (url: string) => Promise<IBoardsData>
  deleteByURL: (id: string) => Promise<void>
  add: (tasks: IBoardsData, id: string) => Promise<void>
  update: (tasks: IBoardsData, url: string) => Promise<void>
  getPermission: (id: string) => Promise<string[]>
}
