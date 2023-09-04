import { UserUseCases } from '@src/app/useCases/users/userUseCases'
import { UserResponse } from '../../../../app/useCases/users/responses/userResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class RegisterUserController {
  private readonly registerUser: UserUseCases

  constructor (registerUser: UserUseCases) {
    this.registerUser = registerUser
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const userData = {
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: String(httpRequest.body.password),

      // Payament API
      mobilePhone: httpRequest.body.mobilePhone,
      cpfCnpj: httpRequest.body.cpfCnpj,
      notificationDisabled: httpRequest.body.notificationDisabled === 'on'
    }

    try {
      if (!httpRequest.body.name || !httpRequest.body.email || !httpRequest.body.password) {
        const field = httpRequest.body.name = 'name'

        return badRequest(new MissingParamError(field))
      }

      const registerUserResponse: UserResponse =
        await this.registerUser.registerUserOnDatabase(userData)

      if (registerUserResponse.isLeft()) {
        return badRequest(registerUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return created(userData)
  }
}
