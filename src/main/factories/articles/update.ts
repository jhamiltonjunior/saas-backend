import { PostgresArticleRepository } from '../../../external/database/postgreSQL/articles/postgresArticleRepository'
import { connectionObject } from '../utils/connectionObject'
import { PostgresUserRepository } from '../../../external/database/postgreSQL/users/postgresUserRepository'
import { ArticleUseCases } from '@useCases/articles/articleUseCases'
import { UpdateArticleController } from '@src/adapters/http/controllers/articles/updateArticleController'

const userRepository = new PostgresUserRepository(connectionObject)

export const makeUpdateArticleController = (): UpdateArticleController => {
  const updateArticleRepository = new PostgresArticleRepository(connectionObject)
  const updateArticle = new ArticleUseCases(updateArticleRepository, userRepository)
  const updateArticleController = new UpdateArticleController(updateArticle)
  return updateArticleController
}
