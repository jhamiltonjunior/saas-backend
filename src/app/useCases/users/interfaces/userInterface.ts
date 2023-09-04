import { IUserData, IUserAuthData, IUser } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../responses/userResponse'
import { AuthUserResponse } from '../responses/authUserResponse'
import { ShowUniqueUserResponse } from '../responses/showUniqueUserResponse'
import { DeleteUserResponse } from '../responses/deleteUserResponse'

export interface UserInterface {
  registerUserOnDatabase: (user: IUser) => Promise<UserResponse>
  updateUserOnDatabase: (user: IUserData, id: string, token: string) => Promise<UserResponse>
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
  showUniqueUser (id: string): Promise<ShowUniqueUserResponse>
  deleteUser (id: string): Promise<DeleteUserResponse>
}
