import { InvalidURLError } from '../../../../domain/entities/tasks/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'
import { IBoardsData } from '../../../../domain/entities/boards/interfaces/boardsData'

export type ShowUniqueResponse = Either<
InvalidURLError |
InvalidURLNotFound,
IBoardsData>
