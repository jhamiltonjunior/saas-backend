// import { AuthorData } from '../../domain/entities/articles/validators/author'
import { IUser, IUserAuthData, IUserData, IUserUpdateData } from '../../domain/entities/users/interfaces/userData'

// eslint-disable-next-line camelcase
// type AuthorData = { user_id: string, name: string }

export interface IRegisterUserRepository {
  findAllUsers: () => Promise<IUserData[]>
  findUserByEmail: (email: string) => Promise<IUserData>
  add: (user: IUserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}

export interface IAuthUserRepository {
  findUserByEmail: (email: string) => Promise<IUserAuthData>
  comparePassword: (password: string, hash: string) => Promise<boolean>
  exists: (email: string) => Promise<boolean>
  authenticateUser: (id: string | undefined, token?: string) => Promise<string>
}

export interface IUserRepository {
  add: (user: IUser) => Promise<string>
  update: (user: IUserUpdateData, tokenId: string) => Promise<string>
  generateDefaultPermission: (userId: string, permissionId: string) => Promise<void>
  findUserById: (id: string) => Promise<IUser | null>
  getPermission: (id: string) => Promise<string>

  exists: (email: string) => Promise<boolean>

  deleteById: (url: string) => Promise<void>

  // methods more used for authenticate
  findUserByEmail: (email: string, where?: any) => Promise<IUser | null>
  comparePassword: (password: string, hash: string) => Promise<boolean>
  authenticateUser: (id: string | undefined, token?: string) => Promise<string>
}
