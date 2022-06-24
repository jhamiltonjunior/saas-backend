import { PostgresArticleRepository } from '../../../external/database/postgreSQL/articles/postgresArticleRepository'
import { connectionObject } from '../utils/connectionObject'
import { DeleteArticleController } from '../../../adapters/http/controllers/articles/deleteArticleController'
import { ArticleUseCases } from '../../../app/useCases/articles/articleUseCases'

export const makeDeleteArticleController = (): DeleteArticleController => {
  const deleteArticleRepository = new PostgresArticleRepository(connectionObject)
  const deleteArticle = new ArticleUseCases(deleteArticleRepository)
  const deleteArticleController = new DeleteArticleController(deleteArticle)
  return deleteArticleController
}
