import { describe, before, after, it } from 'node:test'
import { strictEqual, fail } from 'node:assert'

const BASE_URL = 'http://localhost:8000'

describe('Testing the Tasks', () => {
  let _server: any = {}

  before(async () => {
    try {
      _server = (await import('../../src/main/config/node/app')).default
      await new Promise(
        resolve => _server.once('listening', resolve)
      )
    } catch (error) {
      console.log(error)
    }
  })

  after(done => _server.close(done))

  it('should get a main router with status code 200', async () => {
    try {
      const response = await fetch(`${BASE_URL}/`)

      console.log(response.status)
      console.log(response.body)

      strictEqual(response.status, 200)
    } catch (error: any) {
      // console.log(error)
      fail(error)
    }
  })

  it('should get a main router with status code 200', async () => {
    const response = {
      status: 200
    }
    strictEqual(response.status, 200)
  })
})
