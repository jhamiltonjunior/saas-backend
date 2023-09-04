import { MissingParamError } from '../errors/missingParamError'
import { badRequest, customResponse, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'
import { UserUseCases } from '../../../../app/useCases/users/userUseCases'

export class UpdateUserController {
  private readonly userUseCases: UserUseCases
  // public readonly hash: string

  constructor (useCases: UserUseCases) {
    this.userUseCases = useCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const id = httpRequest.params.id
    const { authorization } = httpRequest.headers

    if (!authorization) return badRequest(new MissingParamError('token'))
    const parts = authorization.split(' ')

    if (parts.length !== 2) return badRequest(new MissingParamError('token'))
    if (!authorization) return badRequest(new MissingParamError('token'))
    if (!authorization) return badRequest(new MissingParamError('token'))
    if (!id) return badRequest(new MissingParamError('id'))
    if (!httpRequest.body) return badRequest(new MissingParamError('body'))

    const [, token] = (<any>parts)
    const updateData = {
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    let updateUserResponse:any = ''
    try {
      updateUserResponse = await this.userUseCases.updateUserOnDatabase(updateData, id, token)

      if (updateUserResponse.isLeft()) {
        return updateUserResponse.value.message === 'User not allowed' ? customResponse(updateUserResponse.value, 403) : badRequest(updateUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }
    return ok(updateUserResponse)
  }
}
