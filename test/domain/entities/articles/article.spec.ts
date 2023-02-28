import { left } from '../../../../src/shared/either'
import { InvalidAuthorError } from '../../../../src/domain/entities/taskss/errors/invalidAuthor'
import { InvalidBodyError } from '../../../../src/domain/entities/taskss/errors/invalidBody'
import { InvalidCategoryError } from '../../../../src/domain/entities/taskss/errors/invalidCategory'
import { InvalidCommentaryError } from '../../../../src/domain/entities/taskss/errors/invalidCommentary'
import { InvalidCreatedAtError } from '../../../../src/domain/entities/taskss/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../../src/domain/entities/taskss/errors/invalidTitle'
import { InvalidURLError } from '../../../../src/domain/entities/taskss/errors/invalidURL'
import { InvalidUpdatedAtError } from '../../../../src/domain/entities/taskss/errors/invalidUpdatedAt'
import { Tasks } from '../../../../src/domain/entities/taskss/tasks'

describe('Tasks Domain Entity', () => {
  it('Should not create tasks with invalid title (little characters)', () => {
    const title = 'o'
    const tasks = Tasks.create({
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

    expect(tasks).toEqual(left(new InvalidTitleError(title)))
  })

  it('Should not create tasks with invalid body (little characters)', () => {
    const body = 'w'
    
    const tasks = Tasks.create({
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

    expect(tasks).toEqual(left(new InvalidBodyError(body)))
  })

  it('Should not create tasks with invalid url (little characters)', () => {
    const url = 'o'
    const tasks = Tasks.create({
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

    expect(tasks).toEqual(left(new InvalidURLError(url)))
  })

  it('Should not create tasks with invalid title (very characters)', () => {
    let title = ''

    for (let i = 0; i < 265; i++) {
      title = 'o'
    }

    const tasks = Tasks.create({
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

    expect(tasks).toEqual(left(new InvalidTitleError(title)))
  })

  it('Should not create tasks with invalid url (very characters)', () => {
    let url = ''
    
    for (let i = 0; i < 100; i++) {
      url = 'o'
    }

    const tasks = Tasks.create({
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

    expect(tasks).toEqual(left(new InvalidURLError(url)))
  })
})