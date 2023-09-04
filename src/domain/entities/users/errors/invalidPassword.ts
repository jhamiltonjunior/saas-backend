import { IDomainError } from './domainError'

export class InvalidPasswordError extends Error implements IDomainError {
  constructor (password: string) {
    super(`This password ${password} is invalid`)
    this.message = 'InvalidPasswordError'
  }
}
