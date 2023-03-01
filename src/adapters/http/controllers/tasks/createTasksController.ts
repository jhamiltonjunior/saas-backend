import { IHttpRequest, IHttpResponse } from '../ports/http'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { allErrorsResponse } from '../../../../app/useCases/tasks/responses/allErrorsResponse'
import { MissingParamError } from '../errors/missingParamError'
import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { TasksUseCases } from '../../../../app/useCases/tasks/tasksUseCases'

export class CreateTasksController {
  private readonly tasksUseCases: TasksUseCases

  constructor (tasksUseCases: TasksUseCases) {
    this.tasksUseCases = tasksUseCases
  }

  async handle (httpRequest: IHttpRequest, author: AuthorData): Promise<IHttpResponse> {
    // const url = httpRequest.body.url.trim().replace(/( )+/g, ' ').split(' ').join('-')

    const tasksData = {
      title: httpRequest.body.title,
      body: httpRequest.body.body,
      author,
      category: httpRequest.body.category,
      createdAt: new Date(),
      url: httpRequest.body.url,
    }

    try {
      if (
        !httpRequest.body.url ||
        !httpRequest.body.body ||
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
        return badRequest(tasksResponse.value)
      }
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
    return created(httpRequest.body)
  }
}
