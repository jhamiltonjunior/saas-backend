import { AuthUserResponse } from '../../../../app/useCases/users/authUserResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'
import { UserUseCases } from '../../../../app/useCases/users/userUseCases'

export class AuthUserController {
  private readonly authUser: UserUseCases
  // public readonly hash: string

  constructor (useCases: UserUseCases) {
    this.authUser = useCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const authData = {
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    try {
      if (!httpRequest.body.email || !httpRequest.body.password) {
        const field = httpRequest.body ? 'email' : 'password'

        return badRequest(new MissingParamError(field))
      }

      const authUserResponse: AuthUserResponse =
        await this.authUser.authWithEmail(authData)

      if (authUserResponse.isLeft()) {
        return badRequest(authUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return ok(authData)
  }
}
