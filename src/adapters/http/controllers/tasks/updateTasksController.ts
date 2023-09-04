import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/tasks/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'
import { randomUUID } from 'crypto'

export class UpdateTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    const urlOfParams: string = httpRequest.params.url

    const tasksData = {
      task_id: randomUUID(),
      title: httpRequest.body?.title,
      description: httpRequest.body?.description,
      indice: 2,

      // user_id: author.userId,
      // list_id: httpRequest.body.listId,

      //
      //
      //

      user_id: 'd2c86e88-f013-4430-a194-d4b1c0e674ac',
      list_id: '48f5c81d-fa34-4245-9e08-4cf3c5bd3c1f',

      //
      //
      //
      task_is_active: true,
      tag: httpRequest.body?.tag,
      created_at: new Date(),
      update_at: new Date(),
      url: httpRequest.body?.url,
    }

    try {
      if (Object.keys(httpRequest.body).length < 1) {
        return badRequest(new MissingParamError('field'))
      }
      const tasksResponse: allErrorsResponse =
        await this.tasksUseCases.updateTask(tasksData, author, urlOfParams)

      if (tasksResponse.isLeft()) {
        if (typeof tasksResponse.value === 'string') return badRequest(new Error(tasksResponse.value))

        return badRequest(tasksResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return ok(httpRequest.body)
  }
}
