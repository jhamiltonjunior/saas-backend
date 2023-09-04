import { IDomainError } from './domainError'

export class InvalidUserError extends Error implements IDomainError {
  constructor (user: string, email: string) {
    super(`This name or email ${user || email} is invalid!`)
    this.message = user || email
  }
}
