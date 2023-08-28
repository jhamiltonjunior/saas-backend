import { AuthorData } from '../validators/author'

export interface IBoardsData {
  title: string
  author: AuthorData
  // eslint-disable-next-line camelcase
  user_id: string
  // change for slice of strings
  // string []
  createdAt: Date
  url: string
  updatedAt?: Date
  // commentary?: {
  //   title: string,
  //   body: string
  // }
}
