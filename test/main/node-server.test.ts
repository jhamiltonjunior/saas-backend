import { describe, before, after, it } from 'node:test'
import { Server } from 'node:http'

describe('Testing the Tasks', () => {
  let _server: Server

  before(async () => {
    _server = (await import('../../src/main/config/node')).app

    await new Promise(resolve => _server.once('listening', resolve))
  })

  it('should get a main router with status code 200', () => {})

  after(done => _server.close(done))
})
