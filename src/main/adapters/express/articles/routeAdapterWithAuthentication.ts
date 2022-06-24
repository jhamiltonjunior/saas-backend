import { Request, Response } from 'express'
import { validateUser } from '../../../../external/jwt/jwt'

import { CreateArticleController } from '../../../../adapters/http/controllers/articles/createArticleController'
import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { DeleteArticleController } from 'src/adapters/http/controllers/articles/deleteArticleController'
import { UpdateArticleController } from '@src/adapters/http/controllers/articles/updateArticleController'

export const adapterRouteWithAuthentication = (
  controller:
  CreateArticleController |
  UpdateArticleController |
  DeleteArticleController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const authHeaders = req.headers.authorization

    if (authHeaders === undefined) {
      res.status(401).json({ message: 'Token error' })
      return
    }

    const parts = authHeaders.split(' ')

    if (parts.length !== 2) { res.status(401).json({ message: 'Token error' }) }

    const [, token] = parts

    const id = validateUser(token)

    const author = {
      user_id: id,
      name: 'any'
    }

    const httpResponse = await controller.handle(httpRequest, author)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
