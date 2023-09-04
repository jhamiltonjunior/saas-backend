import { UserUseCases } from '../../../../app/useCases/users/userUseCases'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'
import { ShowUniqueUserResponse } from '../../../../app/useCases/users/responses/showUniqueUserResponse'

export class ShowUserController {
  private readonly registerUser: UserUseCases

  constructor (registerUser: UserUseCases) {
    this.registerUser = registerUser
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const id = httpRequest.params.id
    const userData = {
      name: '',
      email: '',
      password: ''
    }

    try {
      if (!httpRequest.params.id) {
        const field = httpRequest.params.id = 'id'

        return badRequest(new MissingParamError(field))
      }

      const showUserResponse: ShowUniqueUserResponse =
        await this.registerUser.showUniqueUser(id)

      if (showUserResponse.isLeft()) {
        return badRequest(showUserResponse.value)
      }

      if (showUserResponse.isRight()) {
        if (showUserResponse.value.name) userData.name = showUserResponse.value.name
        if (showUserResponse.value.email) userData.email = showUserResponse.value.email
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return ok(userData)
  }
}
