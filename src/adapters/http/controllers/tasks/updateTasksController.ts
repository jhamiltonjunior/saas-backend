import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/tasks/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'

export class UpdateTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    const urlOfParams: string = httpRequest.params.url
    const date = new Date()

    const tasksData = {
      title: httpRequest.body.title,
      body: httpRequest.body.body,
      author,
      category: httpRequest.body.category,
      createdAt: date,
      updatedAt: date,
      url: httpRequest.body.url,
    }

    console.log(tasksData)

    try {
      if (Object.keys(httpRequest.body).length < 1) {
        const field = !httpRequest.body
          ? 'url' ||
        'title' ||
        'author'
          : 'category'

        return badRequest(new MissingParamError(field))
      }
      const tasksResponse: allErrorsResponse =
        await this.tasksUseCases.updateTask(tasksData, author, urlOfParams)

      if (tasksResponse.isLeft()) {
        return badRequest(tasksResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return ok(httpRequest.body)
  }
}
