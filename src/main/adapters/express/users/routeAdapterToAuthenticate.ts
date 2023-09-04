import { Request, Response } from 'express'

import { AuthUserController } from '../../../adapters/http/controllers/users/authUserController'

import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'

export const routeAdapterToAuthenticate = (controller:
  AuthUserController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    // httpResponse.body.message

    res.status(httpResponse.statusCode).json(httpResponse.body)

    // if (httpResponse.body.message === 'email exist') {
    //   res.status(httpResponse.statusCode).redirect(httpResponse.redirect)
    // }

    // if (
    //   httpResponse.body.message === 'success'
    // ) {
    //   res.status(httpResponse.statusCode)
    //     .redirect(httpResponse.redirect)
    // }

    // if (
    //   httpResponse.body.message === 'email exist'
    // ) {
    //   res.status(httpResponse.statusCode)
    //     .redirect(httpResponse.redirect)
    // }

    // if (httpResponse.statusCode !== 200) {
    //   res.status(httpResponse.statusCode)
    //     // .json('login failed')
    //     .redirect(`${process.env.ADMIN}/login`)
    // }

    // res.status(httpResponse.statusCode)
    //   .cookie('token', httpResponse.body.token)
    //   .redirect(`${process.env.ADMIN}`)
  }
}
