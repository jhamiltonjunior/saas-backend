import { ShowAllArticleController } from '../../../adapters/http/controllers/articles/showAllArticleController'
import { ArticleUseCases } from '../../../app/useCases/articles/articleUseCases'
import { PostgresArticleRepository } from '../../../external/database/postgreSQL/articles/postgresArticleRepository'
import { connectionObject } from '../utils/connectionObject'

export const makeShowAllArticleController = (): ShowAllArticleController => {
  const articleRepository = new PostgresArticleRepository(connectionObject)
  const articleUseCases = new ArticleUseCases(articleRepository)
  const showAllArticleController = new ShowAllArticleController(articleUseCases)
  return showAllArticleController
}
