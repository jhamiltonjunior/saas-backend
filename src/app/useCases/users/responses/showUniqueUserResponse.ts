import { IUserData } from '@src/domain/entities/users/interfaces/userData'
import { Either } from '../../../../shared/either'
import { InvalidUserIdError } from '../errors/invalidUserId'

export type ShowUniqueUserResponse = Either<InvalidUserIdError, IUserData>
