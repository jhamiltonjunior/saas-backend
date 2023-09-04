/* eslint-disable camelcase */
export interface IUserData {
  // eslint-disable-next-line camelcase
  user_id?: string
  name?: string
  token?: string
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
  user_id: string;

  name: string;
  email: string;
  password: string;

  image_file?: number;
  identifier?: string | null;

  user_is_active: boolean;
  user_payment_id?: string;
}

export interface IUserUpdateData {
  name?: string;
  email?: string;
  password?: string | null;

  image_file?: number;
  identifier?: string | null;

  user_is_active?: boolean;
  user_payment_id?: string;
}
