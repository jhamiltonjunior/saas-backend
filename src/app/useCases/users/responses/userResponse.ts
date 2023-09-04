import { InvalidPasswordError } from 'src/domain/entities/users/errors/invalidPassword'
import { InvalidEmailError } from '../../../../domain/entities/users/errors/invalidEmail'
import { InvalidNameError } from '../../../../domain/entities/users/errors/invalidName'
import { IUserData } from '../../../../domain/entities/users/interfaces/userData'
import { Either } from '../../../../shared/either'

type Success = {userData: IUserData, token: string}

export type UserResponse = Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, string | Success>
