import { Request, Response } from 'express'

import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { ShowUniqueArticleController } from '../../../../adapters/http/controllers/articles/showUniqueArticleController'
import { ShowAllArticleController } from 'src/adapters/http/controllers/articles/showAllArticleController'

export const adapterRouteShowArticle = (
  controller: ShowUniqueArticleController | ShowAllArticleController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
