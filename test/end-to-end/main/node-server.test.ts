import { describe, before, after, it } from 'node:test'
import { strictEqual, fail } from 'node:assert'

const BASE_URL = 'http://localhost:5001/api'

describe('Testing the Tasks', () => {
  let _server: any = {}

  before(async () => {
    try {
      _server = (await import('../../../src/main/server')).default
      await new Promise(
        resolve => _server.once('listening', resolve)
      )
    } catch (error) {
      console.log(error)
    }
  })

  after(done => _server.close(done))

  it('should get main router with status code 200', async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`)

      strictEqual(response.status, 200)
    } catch (error: any) {
      fail(error)
    }
  })

  it('should get main router with content type json', async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`)

      strictEqual(typeof await response.json(), typeof JSON)
    } catch (error: any) {
      fail(error)
    }
  })

  it('should register new tasks with status code 200', async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/register`, {
        method: 'POST'
      })

      strictEqual(response.status, 200)
    } catch (error: any) {
      fail(error)
    }
  })

  it('should check if user is authenticate for create new tasks with status code 200', async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/auth`, {
        method: 'POST'
      })

      strictEqual(response.status, 200)
    } catch (error: any) {
      fail(error)
    }
  })
})
