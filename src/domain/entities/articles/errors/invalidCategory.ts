import { IDomainError } from './domainError'

export class InvalidCategoryError extends Error implements IDomainError {
  constructor (category: string) {
    super(`This category ${category} is invalid`)
    this.message = 'InvalidCategoryError'
  }
}
