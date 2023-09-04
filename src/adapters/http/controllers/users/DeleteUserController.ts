import { DeleteUserResponse } from '../../../../app/useCases/users/responses/deleteUserResponse'
import { UserUseCases } from '../../../../app/useCases/users/userUseCases'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class DeleteUserController {
  private readonly userUseCases: UserUseCases

  constructor (userUseCases: UserUseCases) {
    this.userUseCases = userUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const url: string = httpRequest.params.id

    try {
      const userResponse: DeleteUserResponse =
        await this.userUseCases.deleteUser(url)

      if (userResponse.isLeft()) {
        return badRequest(userResponse.value)
      }

      httpRequest.body = userResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
