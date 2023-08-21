/* eslint-disable no-undef */

// import { IUserData } from '../src/domain/entities/users/interfaces/userData'

import { config as dotenvConfig } from 'dotenv'
import request from 'supertest'
import app from '../../src/main/config/app'
import { randomUUID } from 'crypto'

dotenvConfig()

const task = {
  title: 'Jose Hamilton',
  author: { user_id: 'ee2a1e16-5853-457f-8920-e04702f0c16b', name: 'string' },
  body: { name: '123456' },
  url: randomUUID(),
  createdAt: new Date(),
  category: 'important',
  password: ''
}

const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI3YWU3MjQtNGJiZS00MjY0LTk2MTAtMTI3ZWI1NTc4ZGRjIiwiaWF0IjoxNjkyNTc3MjM5LCJleHAiOjE2OTI2NjM2Mzl9.9kDPZstAxPJjJGPCSlMFuneEf7nq2PVeWuyV2MyxmAs'
// "jest": "^27.5.1"

describe('External Server', () => {
  it('test api /api/tasks - get', async () => {
    const response = await request(app).get('/api/tasks')

    if (response.statusCode === 404) {
      throw Error('Task not found')
    }

    expect(response.statusCode).toEqual(200)
    expect(typeof response.body).toEqual('object')
  })

  it('test /api/tasks/create - post', async () => {
    // user.email = randomUUID() + '@gmail.com

    const response = await request(app)
      .post('/api/tasks/create')
      .send(task)
      .set('Authorization', 'Bearer ' + token)

    if (response.statusCode === 400) {
      expect(response.body).toEqual('User ID not exists!')

      return
    }

    if (response.statusCode === 401) {
      expect(response.body.message).toEqual('no token provided')

      return
    }

    if (response.statusCode === 404) {
      throw Error('Task not found')
    }

    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
    expect(typeof response.body).toBe('object')
    expect(response.statusCode).toEqual(201)
  })

  it('test /api/tasks/find/:url - post', async () => {
    const response = await request(app)
      .get(`/api/tasks/find/${task.url}`)
      .set('Authorization', 'Bearer ' + token)

    if (response.statusCode === 400) {
      expect(response.body).toEqual('User ID not exists!')

      return
    }

    if (response.statusCode === 401) {
      expect(response.body.message).toEqual('no token provided')

      return
    }

    if (response.statusCode === 404) {
      throw Error('Task not found')
    }

    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
    expect(typeof response.body).toBe('object')
    expect(response.statusCode).toEqual(200)
  })

  it('test /api/tasks/edit/:url - post', async () => {
    const response = await request(app)
      .put(`/api/tasks/edit/${task.url}`)
      .send(task)
      .set('Authorization', 'Bearer ' + token)

    if (response.statusCode === 400) {
      expect(response.body).toEqual('Missing Param Error')

      return
    }

    if (response.statusCode === 401) {
      expect(response.body.message).toEqual('no token provided')

      return
    }

    if (response.statusCode === 404) {
      throw Error('Task not found')
    }

    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
    expect(typeof response.body).toBe('object')
    expect(response.statusCode).toEqual(200)
  })

  it('test /api/tasks/delete/:url - post', async () => {
    const response = await request(app)
      .delete(`/api/tasks/delete/${task.url}`)
      .set('Authorization', 'Bearer ' + token)

    if (response.statusCode === 400) {
      expect(response.body).toEqual('Missing Param Error')

      return
    }

    if (response.statusCode === 401) {
      expect(response.body.message).toEqual('no token provided')

      return
    }

    if (response.statusCode === 404) {
      throw Error('Task not found')
    }

    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
    expect(typeof response.body).toBe('object')
    expect(response.statusCode).toEqual(200)
  })
})
