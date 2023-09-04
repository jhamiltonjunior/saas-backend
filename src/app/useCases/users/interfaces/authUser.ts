import { IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { AuthUserResponse } from '../responses/authUserResponse'

export interface IAuthUser {
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
}
