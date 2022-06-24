import { ArticleUseCases } from '../../../app/useCases/articles/articleUseCases'
import { PostgresArticleRepository } from '../../../external/database/postgreSQL/articles/postgresArticleRepository'
import { ShowUniqueArticleController } from '../../../adapters/http/controllers/articles/showUniqueArticleController'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeShowUniqueArticleConstroller = (): ShowUniqueArticleController => {
  const articleRepository = new PostgresArticleRepository(connectionObject)
  const articleUseCases = new ArticleUseCases(articleRepository, userRepository)
  const showUniqueArticleController = new ShowUniqueArticleController(articleUseCases)
  return showUniqueArticleController
}
