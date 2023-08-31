import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/tasks/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'
import { ITasksData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { randomUUID } from 'crypto'

export class CreateTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData, listOfIds: any): Promise<IHttpResponse> {
    // const url = httpRequest.body.url.trim().replace(/( )+/g, ' ').split(' ').join('-')

    const tasksData: ITasksData = {
      task_id: randomUUID(),
      title: httpRequest.body.title,
      description: httpRequest.body.body,
      user_id: listOfIds.userId,
      list_id: listOfIds.listId,
      task_is_active: true,
      tag: httpRequest.body.tag,
      createdat: new Date(),
      url: httpRequest.body.url,
    }

    try {
      if (
        !httpRequest.body.url ||
        !httpRequest.body.title
      ) {
        const field = !httpRequest.body
          ? 'url' ||
        'title'
          : 'author'

        return badRequest(new MissingParamError(field))
      }
      const tasksResponse: allErrorsResponse =
        await this.tasksUseCases.createTasksOnDatabase(tasksData, author)

      if (tasksResponse.isLeft()) {
        if (typeof tasksResponse.value === 'string') return badRequest(new Error(tasksResponse.value))

        return badRequest(tasksResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return created(httpRequest.body)
  }
}
