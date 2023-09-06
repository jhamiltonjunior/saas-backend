import { Request, Response } from 'express'

import { RegisterUserController } from '../../../../adapters/http/controllers/users/registerUserController'
import { IHttpRequest } from '../../../../adapters/http/controllers/ports/http'
import { createClient } from './utils/createClientPayment'
import { sendAuthorization } from './utils/sendAuthorization'

export const routeAdapterToRegister = (controller:
  RegisterUserController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 201) {
      httpResponse.body.userData.password = ''

      const paymentData = {
        body: {
          ...httpResponse.body.userData,
          ...httpResponse.body.paymentData
        }
      };

      (async function fastExec () {
        const data = await createClient(paymentData)

        if (data.status === 200) {
          const json = await data.json()

          sendAuthorization(`${json.id} ${httpResponse.body.email}`)
        }
      })()

      res.status(httpResponse.statusCode).json(httpResponse.body)
      return
    }

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
