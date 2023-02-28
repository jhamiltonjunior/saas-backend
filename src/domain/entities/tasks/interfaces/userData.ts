export interface IUserData {
  name?: string
  email: string
  password: string
}

export interface IUserAuthData {
  // eslint-disable-next-line camelcase
  user_id?: string
  token?: string
  email: string
  password: string
}

export interface IUser {
  author: {
    // eslint-disable-next-line camelcase
    user_id: string,
    name: string
  }
}
