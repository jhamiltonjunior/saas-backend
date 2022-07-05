import { left } from '../../../../src/shared/either'
import { InvalidAuthorError } from '../../../../src/domain/entities/articles/errors/invalidAuthor'
import { InvalidBodyError } from '../../../../src/domain/entities/articles/errors/invalidBody'
import { InvalidCategoryError } from '../../../../src/domain/entities/articles/errors/invalidCategory'
import { InvalidCommentaryError } from '../../../../src/domain/entities/articles/errors/invalidCommentary'
import { InvalidCreatedAtError } from '../../../../src/domain/entities/articles/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../../src/domain/entities/articles/errors/invalidTitle'
import { InvalidURLError } from '../../../../src/domain/entities/articles/errors/invalidURL'
import { InvalidUpdatedAtError } from '../../../../src/domain/entities/articles/errors/invalidUpdatedAt'
import { Article } from '../../../../src/domain/entities/articles/article'

describe('Article Domain Entity', () => {
  it('Should not create article with invalid title (little characters)', () => {
    const title = 'o'
    const article = Article.create({
      title,
      body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
      createdAt: new Date,
      // updatedAt: Date,
      url: 'stringddddd',
      author: {
        user_id: 'string',
        name: 'string',
      },
      category: 'strinddg',
    })

    expect(article).toEqual(left(new InvalidTitleError(title)))
  })

  it('Should not create article with invalid body (little characters)', () => {
    const body = 'w'
    
    const article = Article.create({
      title: 'sdddddddddddd',
      body,
      createdAt: new Date,
      // updatedAt: Date,
      url: 'stringddddd',
      author: {
        user_id: 'string',
        name: 'string',
      },
      category: 'strinddg',
    })

    expect(article).toEqual(left(new InvalidBodyError(body)))
  })

  it('Should not create article with invalid url (little characters)', () => {
    const url = 'o'
    const article = Article.create({
      title: 'oddoooooooo',
      body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
      createdAt: new Date,
      updatedAt: new Date,
      url,
      author: {
        user_id: 'string',
        name: 'string',
      },
      category: 'strinddg',
    })

    expect(article).toEqual(left(new InvalidURLError(url)))
  })

  it('Should not create article with invalid title (very characters)', () => {
    let title = ''

    for (let i = 0; i < 265; i++) {
      title = 'o'
    }

    const article = Article.create({
      title,
      body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
      createdAt: new Date,
      updatedAt: new Date,
      url: 'kkkkkkkkkkkk',
      author: {
        user_id: '',
        name:''
      },
      category: 'ddddddddddddd',
    })

    expect(article).toEqual(left(new InvalidTitleError(title)))
  })

  it('Should not create article with invalid url (very characters)', () => {
    let url = ''
    
    for (let i = 0; i < 100; i++) {
      url = 'o'
    }

    const article = Article.create({
      title: '000000d 0000',
      body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
      createdAt: new Date,
      updatedAt: new Date,
      url,
      author: {
        user_id: '',
        name:''
      },
      category: 'kdkkkkdkdkkddfdfdd',
    })

    expect(article).toEqual(left(new InvalidURLError(url)))
  })
})