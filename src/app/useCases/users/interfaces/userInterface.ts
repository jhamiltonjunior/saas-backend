import { IUserData, IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../userResponse'
import { AuthUserResponse } from '../authUserResponse'
import { ShowUniqueUserResponse } from '../responses/showUniqueUserResponse'
import { DeleteUserResponse } from '../responses/deleteUserResponse'

export interface UserInterface {
  registerUserOnDatabase: (user: IUserData) => Promise<UserResponse>
  updateUserOnDatabase: (user: IUserData, id: string, token: string) => Promise<UserResponse>
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
  showUniqueUser (id: string): Promise<ShowUniqueUserResponse>
  deleteUser (id: string): Promise<DeleteUserResponse>
}
