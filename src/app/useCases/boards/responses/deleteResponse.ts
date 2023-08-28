import { InvalidURLError } from '../../../../domain/entities/boards/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'

export type DeleteResponse = Either<
InvalidURLError | InvalidURLNotFound, string>
