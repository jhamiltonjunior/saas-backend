import { InvalidURLError } from '../../../../domain/entities/articles/errors/invalidURL'
import { Either } from '../../../../shared/either'
import { InvalidURLNotFound } from '../errors/invalidURLNotFound'

export type DeleteArticleResponse = Either<
InvalidURLError | InvalidURLNotFound, string>
