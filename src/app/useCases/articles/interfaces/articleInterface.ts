import { IArticleRepository } from '../../../repositories/articleRepository'
import { IArticleData } from '../../../../domain/entities/articles/interfaces/articleData'
import { AuthorData } from '../../../../domain/entities/articles/validators/author'
import { CreateArticleResponse } from '../responses/createArticleResponse'
import { DeleteArticleResponse } from '../responses/deleteArticleResponse'
import { ShowUniqueArticleResponse } from '../responses/showUniqueArticleResponse'

export interface ArticleInterface {
  articleRepository: IArticleRepository
  showAllArticle: () => Promise<string | IArticleData[]>
  showUniqueArticle: (urlParams: string) => Promise<ShowUniqueArticleResponse>
  createArticleOnDatabase: (user: IArticleData, author: AuthorData) => Promise<CreateArticleResponse>
  deleteArticle: (urlParams: string) => Promise<DeleteArticleResponse>
}
