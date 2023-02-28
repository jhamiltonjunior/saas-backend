import { DeleteResponse } from '../../../../app/useCases/tasks/responses/deleteResponse'
import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class DeleteTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const url: string = httpRequest.params.url

    try {
      // if (!httpRequest.params) {
      //   const field = !httpRequest.params ? '' : ' '

      //   return badRequest(new MissingParamError(field))
      // }

      const tasksResponse: DeleteResponse =
        await this.tasksUseCases.deleteTasks(url)

      if (tasksResponse.isLeft()) {
        return badRequest(tasksResponse.value)
      }

      httpRequest.body = tasksResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
