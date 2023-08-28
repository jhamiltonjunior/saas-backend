import { InvalidAuthorError } from '../../../../domain/entities/tasks/errors/invalidAuthor'
import { InvalidBodyError } from '../../../../domain/entities/tasks/errors/invalidBody'
import { InvalidCategoryError } from '../../../../domain/entities/tasks/errors/invalidCategory'
import { InvalidCreatedAtError } from '../../../../domain/entities/tasks/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../../domain/entities/tasks/errors/invalidTitle'
import { InvalidUpdatedAtError } from '../../../../domain/entities/tasks/errors/invalidUpdatedAt'
import { InvalidURLError } from '../../../../domain/entities/tasks/errors/invalidURL'
import { InvalidUserDoesNotPermission } from '../errors/invalidUserDoesNotPermission'
import { Either } from '../../../../shared/either'
import { IBoardsData } from '../../../../domain/entities/boards/interfaces/boardsData'

export type allErrorsResponse = Either<
InvalidTitleError |
InvalidBodyError |
InvalidAuthorError |
InvalidCategoryError |
InvalidCreatedAtError |
InvalidURLError |
InvalidUpdatedAtError |
InvalidUserDoesNotPermission,
IBoardsData>
