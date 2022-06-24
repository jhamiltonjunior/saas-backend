import { IArticleData } from '../../../../domain/entities/articles/interfaces/articleData'
import { InvalidAuthorError } from '../../../../domain/entities/articles/errors/invalidAuthor'
import { InvalidBodyError } from '../../../../domain/entities/articles/errors/invalidBody'
import { InvalidCategoryError } from '../../../../domain/entities/articles/errors/invalidCategory'
import { InvalidCreatedAtError } from '../../../../domain/entities/articles/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../../domain/entities/articles/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../../domain/entities/articles/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../../domain/entities/articles/errors/invalidURL'
import { InvalidUserDoesNotPermission } from '../errors/invalidUserDoesNotPermission'
import { Either } from '../../../../shared/either'

export type CreateArticleResponse = Either<
InvalidTitleError |
InvalidBodyError |
InvalidAuthorError |
InvalidCategoryError |
InvalidCreatedAtError |
InvalidURLError |
InvalidUpdatedAtError |
InvalidUserDoesNotPermission,
IArticleData>
