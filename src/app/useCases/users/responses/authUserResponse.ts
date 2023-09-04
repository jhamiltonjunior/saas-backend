import { Either } from '../../../../shared/either'
import { IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { InvalidUserError } from '../errors/invalidUser'

export type AuthUserResponse = Either<InvalidUserError, IUserAuthData>
