import { IDomainError } from './domainError'

export class InvalidCommentaryError extends Error implements IDomainError {
  constructor (
    commentary: {
      title: string,
      body: string
    }
  ) {
    super(`This commentary ${commentary} is invalid`)
    this.message = 'InvalidCommentaryError'
  }
}
