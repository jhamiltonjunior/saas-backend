import { InvalidURLError } from '../../../../../src/domain/entities/taskss/errors/invalidURL';
import { URL } from '../../../../../src/domain/entities/taskss/validators/url';

describe('URL Domain Validator', () => {
  it('Should create url without much hypen', () => {
    const content = '--much--hypen--here'

    const url = URL.create(content)
    
    expect(url).toEqual({
      value: {
        url: "much-hypen-here"
      }
    })
  })

  it('Should create url without much hypen', () => {
    const content = '--much  - -hypen--here'

    const url = URL.create(content)
    
    expect(url).toEqual({
      value: {
        url: "much-hypen-here"
      }
    })
  })

  it('Should not create url with few characters', () => {
    const content = '-much'

    const url = URL.create(content)
    
    expect(url).toEqual({
      value: new InvalidURLError(content)
    })
  })

  it('Should not create url with much characters', () => {
    let content = ''

    for (let i = 0; i < content.length; i++) {
      content = 'i'
    }

    const url = URL.create(content)
    
    expect(url).toEqual({
      value: new InvalidURLError(content)
    })
  })
})