import { IArticleData } from '../../../domain/entities/articles/interfaces/articleData'
import { InvalidURLError } from '../../../domain/entities/articles/errors/invalidURL'
import { Either } from '../../../shared/either'
import { InvalidURLNotFound } from './errors/invalidURLNotFound'

export type ShowUniqueArticleResponse = Either<
InvalidURLError |
InvalidURLNotFound,
IArticleData>
