import jwt from 'jsonwebtoken'

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRETE_KEY: jwt.Secret
    }
  }
}
