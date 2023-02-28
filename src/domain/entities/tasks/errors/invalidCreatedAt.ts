import { IDomainError } from './domainError'

export class InvalidCreatedAtError extends Error implements IDomainError {
  constructor (createdAt: Date) {
    super(`This created at ${createdAt} is invalid`)
    this.message = 'InvalidCreatedAtError'
  }
}
