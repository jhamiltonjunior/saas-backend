import { InvalidURLError } from '../../../../domain/entities/tasks/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'

export type DeleteResponse = Either<
InvalidURLError | InvalidURLNotFound, string>
