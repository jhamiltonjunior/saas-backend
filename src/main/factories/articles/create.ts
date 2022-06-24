import { CreateArticleController } from '../../../adapters/http/controllers/articles/createArticleController'
import { PostgresArticleRepository } from '../../../external/database/postgreSQL/articles/postgresArticleRepository'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'
import { ArticleUseCases } from '@useCases/articles/articleUseCases'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeCreateArticleController = (): CreateArticleController => {
  const createArticleRepository = new PostgresArticleRepository(connectionObject)
  const createArticle = new ArticleUseCases(createArticleRepository, userRepository)
  const createArticleController = new CreateArticleController(createArticle)
  return createArticleController
}
