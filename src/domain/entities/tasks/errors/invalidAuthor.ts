import { IDomainError } from './domainError'

export class InvalidAuthorError extends Error implements IDomainError {
  constructor (author: string) {
    super(`This author ${author} is invalid`)
    this.message = 'InvalidAuthorError'
  }
}
