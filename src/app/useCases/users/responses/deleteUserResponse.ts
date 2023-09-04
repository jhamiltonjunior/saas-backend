import { Either } from '../../../../shared/either'
import { InvalidUserIdError } from '../errors/invalidUserId'

export type DeleteUserResponse = Either<InvalidUserIdError | Error, string>
