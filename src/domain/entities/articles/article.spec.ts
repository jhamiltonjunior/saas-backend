import { left } from '../../../shared/either'
import { InvalidAuthorError } from './errors/invalidAuthor'
import { InvalidBodyError } from './errors/invalidBody'
import { InvalidCategoryError } from './errors/invalidCategory'
import { InvalidCommentaryError } from './errors/invalidCommentary'
import { InvalidCreatedAtError } from './errors/invalidCreatedAt'
import { InvalidTitleError } from './errors/invalidTitle'
import { InvalidURLError } from './errors/invalidURL'
import { InvalidUpdatedAtError } from './errors/invalidUpdatedAt'
import { Article } from './article'

// const content = {
//   title: 'sdddddddddddd',
//   body: 'strinddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgddddddddddddddd',
//   createdAt: new Date,
//   // updatedAt: Date,
//   url: 'stringddddd',
//   author: {
//     id: 'string',
//     name: 'string',
//   },
//   category: 'strinddg',
// }

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