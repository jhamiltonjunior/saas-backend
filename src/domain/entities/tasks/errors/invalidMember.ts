import { IDomainError } from './domainError'

export class InvalidMemberError extends Error implements IDomainError {
  constructor (Member: Object) {
    super(`This Member ${Member} is invalid`)
    this.message = 'Member || InvalidMemberError'
  }
}
