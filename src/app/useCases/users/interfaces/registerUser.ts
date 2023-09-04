import { IUserData } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../responses/userResponse'

export interface IRegisterUser {
  registerUserOnDatabase: (user: IUserData) => Promise<UserResponse>
}
