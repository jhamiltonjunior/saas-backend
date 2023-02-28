import { ITasksData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { InvalidURLError } from '../../../../domain/entities/tasks/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'

export type ShowUniqueResponse = Either<
InvalidURLError |
InvalidURLNotFound,
ITasksData>
