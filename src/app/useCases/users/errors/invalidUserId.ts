import { IDomainError } from './domainError'

export class InvalidUserIdError extends Error implements IDomainError {
  constructor (message: string) {
    super(`This id ${message} is invalid!`)
    this.message = message || 'InvalidEmailError'
  }
}
