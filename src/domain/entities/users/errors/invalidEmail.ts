import { IDomainError } from './domainError'

export class InvalidEmailError extends Error implements IDomainError {
  constructor (email: string) {
    super(`The email ${email} is invalid`)
    this.message = email || 'InvalidEmailError'
  }
}
