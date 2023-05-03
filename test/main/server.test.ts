import { describe, before, after, it } from 'node:test'

import app from '../../src/main/server'

describe('Testing', () => {
  let _server: typeof app

  before(async () => {
    _server = (await import('../../src/main/server')).default
    await new Promise(resolve => _server.app.once('listening', resolve))
  })
  after()
})
