import { InvalidURLError } from '../../../../../src/domain/entities/articles/errors/invalidURL';
import { URL } from '../../../../../src/domain/entities/articles/validators/url';

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
})