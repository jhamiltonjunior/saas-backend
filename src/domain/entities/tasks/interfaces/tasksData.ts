/* eslint-disable camelcase */
import { AuthorData } from '../validators/author'

// export interface ITasksData {
//   title: string
//   body: Object
//   author: AuthorData
//   // eslint-disable-next-line camelcase
//   // user_id: string,
//   // change for slice of strings
//   // string []
//   category: string
//   createdAt: Date
//   url: string
//   updatedAt?: Date
//   // commentary?: {
//   //   title: string,
//   //   body: string
//   // }
// }

export interface ITasksData {
  task_id: string
  title: string
  url: string
  createdat: Date
  updatedat: Date | null
  deletedat: Date | null
  task_is_active: boolean
  user_id: string | null
  list_id: string | null
}
