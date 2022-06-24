import { Router, Request, Response } from 'express'
import { adapterRouteShowArticle } from '../adapters/express/articles/routeAdapterShowUnique'
import { adapterRouteWithAuthentication } from '../adapters/express/articles/routeAdapterWithAuthentication'
import { makeCreateArticleController } from '../factories/articles/create'
import { makeShowUniqueArticleConstroller } from '../factories/articles/showUnique'
import { makeShowAllArticleController } from '../factories/articles/showAll'
import { makeDeleteArticleController } from '../factories/articles/delete'
import { makeUpdateArticleController } from '../factories/articles/update'

export default (router: Router): void => {
  router.get('/article', adapterRouteShowArticle(makeShowAllArticleController()))
  router.get('/article/:url', adapterRouteShowArticle(makeShowUniqueArticleConstroller()))
  router.post('/article', adapterRouteWithAuthentication(makeCreateArticleController()))
  router.post('/article/:url', adapterRouteWithAuthentication(makeUpdateArticleController()))
  router.delete('/article/:url', adapterRouteWithAuthentication(makeDeleteArticleController()))

  router.get('/article/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })
}
