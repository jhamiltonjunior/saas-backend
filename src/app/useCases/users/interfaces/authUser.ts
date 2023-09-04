import { IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { AuthUserResponse } from '../authUserResponse'

export interface IAuthUser {
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
}
