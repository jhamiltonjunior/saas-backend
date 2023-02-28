import { InvalidURLError } from '../../../../domain/entities/taskss/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'

export type DeleteResponse = Either<
InvalidURLError | InvalidURLNotFound, string>
