import { parse } from 'node:url'
import { Request, Response } from 'express'
import { validateUser } from '../../../../external/jwt/jwt'

import { CreateTasksController } from '../../../../adapters/http/controllers/tasks/createTasksController'
import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { DeleteTasksController } from '../../../../adapters/http/controllers/tasks/deleteTasksController'
import { UpdateTasksController } from '../../../../adapters/http/controllers/tasks/updateTasksController'

export const adapterRouteWithAuthentication = (
  controller:
  CreateTasksController |
  UpdateTasksController |
  DeleteTasksController
): any => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
      params: request.url ? parse(request.url, true) : false
    }

    const authHeaders = request.headers.authorization

    if (authHeaders === undefined) {
      response.status(401).json({ message: 'Token error' })
      return
    }

    const parts = authHeaders.split(' ')

    if (parts.length !== 2) { response.status(401).json({ message: 'Token error' }) }

    const [, token] = parts

    const id = validateUser(token)

    const author = {
      user_id: id,
      name: 'any'
    }

    const httpResponse = await controller.handle(httpRequest, author)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
