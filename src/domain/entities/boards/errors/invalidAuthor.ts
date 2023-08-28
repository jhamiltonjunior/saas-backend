import { AuthorData } from '../validators/author'
import { IDomainError } from './domainError'

export class InvalidAuthorError extends Error implements IDomainError {
  constructor (author: AuthorData) {
    super(`This author ${author} is invalid`)
    this.message = 'InvalidAuthorError'
  }
}
