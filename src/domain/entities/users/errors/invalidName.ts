import { IDomainError } from './domainError'

export class InvalidNameError extends Error implements IDomainError {
  constructor (name: string | undefined) {
    super(`The name ${name} is invalid`)
    this.message = 'InvalidNameError'
  }
}
