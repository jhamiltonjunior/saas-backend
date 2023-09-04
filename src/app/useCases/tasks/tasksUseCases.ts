import { Tasks } from '../../../domain/entities/tasks/tasks'
import { InvalidAuthorError } from '../../../domain/entities/tasks/errors/invalidAuthor'
import { InvalidBodyError } from '../../../domain/entities/tasks/errors/invalidBody'
import { InvalidCategoryError } from '../../../domain/entities/tasks/errors/invalidCategory'
import { InvalidCreatedAtError } from '../../../domain/entities/tasks/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../domain/entities/tasks/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../domain/entities/tasks/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../domain/entities/tasks/errors/invalidURL'
import { URL } from '../../../domain/entities/tasks/validators/url'
import { Either, left, right } from '../../../shared/either'
import { ITasksRepository } from '../../repositories/tasksRepository'
import { ITasksData } from '../../../domain/entities/tasks/interfaces/tasksData'
import { AuthorData } from '../../../domain/entities/tasks/validators/author'
import { ShowUniqueResponse } from './responses/showUniqueResponse'
import { allErrorsResponse } from './responses/allErrorsResponse'
import { TasksInterface } from './interfaces/tasksInterface'
import { InvalidURLNotFound } from './errors/invalidURLNotFound'
import { DeleteResponse } from './responses/deleteResponse'
import { InvalidUserDoesNotPermission } from './errors/invalidUserDoesNotPermission'

export class TasksUseCases implements TasksInterface {
  tasksRepository: ITasksRepository

  constructor (
    tasksRepository: ITasksRepository,
  ) {
    this.tasksRepository = tasksRepository
  }

  async showAllTasks (): Promise<string | ITasksData[]> {
    const tasks = await this.tasksRepository.findAllTasks()

    if (tasks === undefined) return 'TasksNotFound'

    return tasks
  }

  async showUniqueTasks (urlParams: string): Promise<ShowUniqueResponse> {
    const urlOrError: Either<InvalidURLError, URL> = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const tasks = await this.tasksRepository.findByURL(url.value)

    if (tasks !== undefined && tasks !== null) {
      return right(tasks)
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }

  /**
   * The method go create one tasks on Database
   * He go verify if exist a URL equal if not exist and the user have permission of writer
   * the tasks go be created
   */
  async createTasksOnDatabase (tasksData: ITasksData): Promise<allErrorsResponse> {
    const tasksOrError: Either<
      InvalidTitleError |
      InvalidBodyError |
      InvalidAuthorError |
      InvalidCategoryError |
      InvalidCreatedAtError |
      InvalidURLError |
      InvalidUpdatedAtError,
      Tasks> = Tasks.create(tasksData)

    if (tasksOrError.isLeft()) {
      return left(tasksOrError.value)
    }

    const tasks: Tasks = tasksOrError.value

    // tasks.url.value vai enviar a string da url já com o valor formatado
    const result = await this.tasksRepository.findByURL(tasks.url.value)
    console.log(result)
    // const permissions = await this.userRep ository?.getPermission(tasks.author.value.user_id)

    // "reader" is temporary
    // if (permissions?.includes('reader')) {
    if (result !== null || result) {
      return left('this url already exist')
    }

    if (
      result === undefined || result === null || !result
    ) {
      await this.tasksRepository.add(tasksData)
      // }
      // Aqui poderia ter um else caso exist uma url igual
    } else {
      return left(new InvalidUserDoesNotPermission(tasks.author.value))
    }

    return right(tasksData)
  }

  async updateTask (tasksData: ITasksData, author: AuthorData, urlParams: string): Promise<allErrorsResponse> {
    const tasksOrError: Either<
      InvalidTitleError |
      InvalidBodyError |
      InvalidAuthorError |
      InvalidCategoryError |
      InvalidCreatedAtError |
      InvalidURLError |
      InvalidUpdatedAtError,
      Tasks> = Tasks.create(tasksData)

    if (tasksOrError.isLeft()) {
      return left(tasksOrError.value)
    }

    const tasks: Tasks = tasksOrError.value

    // tasks.url.value vai enviar a string da url já com o valor formatado
    const result = await this.tasksRepository.findByURL(urlParams)
    // const permissions = await this.tasksRepository.getPermission(tasks.author.value.user_id)

    if (
    // the permission check if user have permission
    // permissions.includes('writer') &&

      // only user who create the tasks can edit it
      author.userId === (<any>result).user_id
    ) {
      if (
        result !== undefined &&
        result !== null &&
        result
      ) {
        await this.tasksRepository.update(
          {
            task_is_active: result.task_is_active,
            title: tasks.title.value || (<any>result).title,
            description: tasks.description ? tasks.description.value : (<any>result),
            url: tasks.url.value || (<any>result).url,
            tag: tasks.tag ? tasks.tag.value : (<any>result).tag,
            list_id: tasksData.list_id ? tasksData.list_id : result.list_id,

            updated_at: tasks.updatedAt?.value as Date
          },
          urlParams
        )
      } else {
        return left(new InvalidURLNotFound(urlParams))
      }
      // Aqui poderia ter um else caso exist uma url igual
    } else {
      return left(new InvalidUserDoesNotPermission(tasks.author.value))
    }

    return right(tasksData)
  }

  async deleteTasks (urlParams: string): Promise<DeleteResponse> {
    //         adicionar uma camada de validação aqui somentoe usarios com permissa de apagar
    //         ou quem criou a tarefa pode apagar

    const urlOrError = URL.create(urlParams)

    if (urlOrError.isLeft()) {
      return left(new InvalidURLError(urlParams))
    }

    const url = urlOrError.value

    const tasks = await this.tasksRepository.findByURL(url.value)

    if (tasks !== undefined && tasks !== null) {
      this.tasksRepository.deleteByURL(tasks.url)

      return right('This Tasks has been deleted')
    } else {
      return left(new InvalidURLNotFound(urlParams))
    }
  }
}
