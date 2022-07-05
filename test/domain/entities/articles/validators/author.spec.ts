import { InvalidAuthorError } from "../../../../../src/domain/entities/articles/errors/invalidAuthor"
import { Author, AuthorData } from "../../../../../src/domain/entities/articles/validators/author"

describe('', () => {
  it('', () => {
    const data: AuthorData = {
      user_id: '',
      name: ''
    }
    console.log(data)
    
    const author = Author.create(data)
    console.log(author)

    expect(author).toEqual({value: new InvalidAuthorError(data)})
  })
})