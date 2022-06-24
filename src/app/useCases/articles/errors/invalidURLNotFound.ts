import { IDomainError } from '../../../../domain/entities/articles/errors/domainError'

export class InvalidURLNotFound extends Error implements IDomainError {
  constructor (url: string) {
    super(`This url ${url} does not exist`)
    this.message = 'InvalidURLNotFound'
  }
}
