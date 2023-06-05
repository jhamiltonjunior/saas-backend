import { describe, it } from 'node:test'
import assert from 'node:assert'

import { left } from '../../../../../src/shared/either'
import { InvalidAuthorError } from '../../../../../src/domain/entities/tasks/errors/invalidAuthor'
import { InvalidBodyError } from '../../../../../src/domain/entities/tasks/errors/invalidBody'
import { InvalidCategoryError } from '../../../../../src/domain/entities/tasks/errors/invalidCategory'
import { InvalidCommentaryError } from '../../../../../src/domain/entities/tasks/errors/invalidCommentary'
import { InvalidCreatedAtError } from '../../../../../src/domain/entities/tasks/errors/invalidCreatedAt'
import { InvalidTitleError } from '../../../../../src/domain/entities/tasks/errors/invalidTitle'
import { InvalidURLError } from '../../../../../src/domain/entities/tasks/errors/invalidURL'
import { InvalidUpdatedAtError } from '../../../../../src/domain/entities/tasks/errors/invalidUpdatedAt'
import { Tasks } from '../../../../../src/domain/entities/tasks/tasks'

describe('Tasks Domain Entity', () => {
  it('Should not create tasks with invalid title (little characters)', () => {
    const title = 'o'
    const tasks = Tasks.create({
      title,
      body: {},
      createdAt: new Date,
      // updatedAt: Date,
      url: 'stringddddd',
      author: {
        user_id: 'string',
        name: 'string',
      },
      category: 'strinddg',
    })


    console.log(
      tasks ===
      left(new InvalidTitleError(title))
    )

    assert.deepEqual(tasks, left(new InvalidTitleError(title)))
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

    assert.deepEqual(tasks, left(new InvalidTitleError(body)))
  })

  it('Should not create tasks with invalid url (little characters)', () => {
    const url = 'o'
    const tasks = Tasks.create({
      title: 'oddoooooooo',
      body: {},
      createdAt: new Date,
      updatedAt: new Date,
      url,
      author: {
        user_id: 'string',
        name: 'string',
      },
      category: 'strinddg',
    })

    assert.deepEqual(tasks, left(new InvalidTitleError(url)))
  })

  it('Should not create tasks with invalid title (very characters)', () => {
    let title = ''

    for (let i = 0; i < 265; i++) {
      title = 'o'
    }

    const tasks = Tasks.create({
      title,
      body: {},
      createdAt: new Date,
      updatedAt: new Date,
      url: 'kkkkkkkkkkkk',
      author: {
        user_id: '',
        name:''
      },
      category: 'ddddddddddddd',
    })

    assert.deepEqual(tasks, left(new InvalidTitleError(title)))
  })

  it('Should not create tasks with invalid url (very characters)', () => {
    let url = ''
    
    for (let i = 0; i < 100; i++) {
      url = 'o'
    }

    const tasks = Tasks.create({
      title: '000000d 0000',
      body: {},
      createdAt: new Date,
      updatedAt: new Date,
      url,
      author: {
        user_id: '',
        name:''
      },
      category: 'kdkkkkdkdkkddfdfdd',
    })

    assert.deepEqual(tasks, left(new InvalidTitleError(url)))
  })
})