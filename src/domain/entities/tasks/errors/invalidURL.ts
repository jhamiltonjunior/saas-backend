import { IDomainError } from './domainError'

export class InvalidURLError extends Error implements IDomainError {
  constructor (url: string) {
    super(`This url ${url} is invalid`)
    this.message = 'InvalidURLError'
  }
}
