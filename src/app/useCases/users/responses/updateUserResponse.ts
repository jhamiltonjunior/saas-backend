import { InvalidPasswordError } from '../../../../domain/entities/users/errors/invalidPassword'
import { InvalidEmailError } from '../../../../domain/entities/users/errors/invalidEmail'
import { InvalidNameError } from '../../../../domain/entities/users/errors/invalidName'
import { IUserData } from '../../../../domain/entities/users/interfaces/userData'
import { Either } from '../../../../shared/either'

export type UpdateUserResponse = Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, string | IUserData>
