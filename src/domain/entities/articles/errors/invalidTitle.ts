import { IDomainError } from './domainError'

export class InvalidTitleError extends Error implements IDomainError {
  constructor (title: string) {
    super(`This title ${title} is invalid`)
    this.message = 'InvalidTitleError'
  }
}
