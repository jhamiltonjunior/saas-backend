import { AuthorData } from '../../domain/entities/tasks/validators/author'
import { IUserAuthData, IUserData } from '../../domain/entities/tasks/interfaces/userData'

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
  findUserById: (id: string) => Promise<AuthorData>
  getPermission: (id: string) => Promise<string>
}
