import { Either, left, right } from '../../../../shared/either'
import { InvalidMemberError } from '../errors/invalidMember'

export class Member {
  private readonly member: Object
  constructor (member: Object) {
    this.member = member

    Object.freeze(this)
  }

  static create (member: Object): Either<InvalidMemberError, Member> {
    if (!Member.validator(member)) {
      return left(new InvalidMemberError(member))
    }

    return right(new Member(member))
  }

  get value (): Object {
    return this.member
  }

  static validator (member: Object): boolean {
    if (
      !member ||
      typeof member !== 'object'
      // body.length < 100
    ) {
      return false
    }
    return true
  }
}
