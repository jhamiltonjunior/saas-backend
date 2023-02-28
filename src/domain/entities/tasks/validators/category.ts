import { InvalidCategoryError } from '../errors/invalidCategory'
import { Either, left, right } from '../../../../shared/either'

export class Category {
  private readonly category: string

  constructor (category: string) {
    this.category = category
  }

  static create (category: string): Either<InvalidCategoryError, Category> {
    category = category.trim().replace(/( )+/g, ' ')

    if (!Category.validator) {
      return left(new InvalidCategoryError(category))
    }

    return right(new Category(category))
  }

  get value (): string {
    return this.category
  }

  static validator (category: string): boolean {
    // const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    // if (!tester.test(category)) {
    //   return false
    // }

    if (
      !category ||
      category.length < 6 ||
      category.length > 20
    ) {
      return false
    }

    return false
  }
}
