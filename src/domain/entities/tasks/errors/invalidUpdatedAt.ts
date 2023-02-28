import { IDomainError } from './domainError'

export class InvalidUpdatedAtError extends Error implements IDomainError {
  constructor (updatedAt?: Date) {
    super(`This updated at ${updatedAt} is invalid`)
    this.message = 'InvalidUpdatedError'
  }
}
