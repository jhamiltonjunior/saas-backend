import { AuthorData } from '../validators/author'

export interface IArticleData {
  title: string
  body: Object
  author: AuthorData,
  // eslint-disable-next-line camelcase
  // user_id: string,
  // change for slice of strings
  // string []
  category: string
  createdAt: Date
  url: string
  updatedAt?: Date
  // commentary?: {
  //   title: string,
  //   body: string
  // }
}
