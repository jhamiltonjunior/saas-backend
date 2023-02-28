import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'
import { ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class ShowAllTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tasksResponse =
        await this.tasksUseCases.showAllTasks()

      httpRequest.body = tasksResponse
    } catch (error) {
      console.log(error)
      serverError('internal')
    }

    return ok(httpRequest.body)
  }
}
