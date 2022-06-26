import { IArticleData } from '../../domain/entities/articles/interfaces/articleData'

export interface IArticleRepository {
  findAllArticles: () => Promise<IArticleData[]>
  findByURL: (url: string) => Promise<IArticleData>
  deleteByURL: (id: string) => Promise<void>
  add: (article: IArticleData, id: string) => Promise<void>
  update: (article: IArticleData, id: string) => Promise<void>
}
