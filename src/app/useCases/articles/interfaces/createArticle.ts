import { IArticleData } from 'src/domain/entities/articles/interfaces/articleData'
import { AuthorData } from 'src/domain/entities/articles/validators/author'
import { IArticleRepository } from 'src/app/repositories/articleRepository'
import { CreateArticleResponse } from '../responses/createArticleResponse'

export interface ICreateArticle {
  articleRepository: IArticleRepository
  createArticleOnDatabase: (user: IArticleData, author: AuthorData) => Promise<CreateArticleResponse>
}
