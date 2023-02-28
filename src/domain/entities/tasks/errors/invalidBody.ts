import { IDomainError } from './domainError'

export class InvalidBodyError extends Error implements IDomainError {
  constructor (body: Object) {
    super(`This body ${body} is invalid`)
    this.message = 'InvalidBodyError'
  }
}
