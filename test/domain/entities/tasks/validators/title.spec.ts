import { InvalidTitleError } from "../../../../../src/domain/entities/tasks/errors/invalidTitle"
import { Title } from "../../../../../src/domain/entities/tasks/validators/title"

describe('Title Domain Validator', () => {
  it('Should not create title with little characters', () => {
    const content = '123456789'

    const title = Title.create(content)

    expect(title).toEqual({value: new InvalidTitleError(content)})
  })

  it('Should not create title with Much characters', () => {
    let content = ''

    for (let i = 256; content.length < i; i) {
      content += 'o'
    }

    const title = Title.create(content)

    expect(title).toEqual({value: new InvalidTitleError(content)})
  })

  it('Should not create title if null', () => {
    const content = ''

    const title = Title.create(content)

    expect(title).toEqual({value: new InvalidTitleError(content)})
  })
})