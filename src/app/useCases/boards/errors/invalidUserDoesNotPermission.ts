import { IDomainError } from '../../../../domain/entities/tasks/errors/domainError'

export class InvalidUserDoesNotPermission extends Error implements IDomainError {
  constructor (user: string) {
    super(`This user ${user} does not permission`)
    this.message = 'InvalidUserDoesNotPermission'
  }
}
