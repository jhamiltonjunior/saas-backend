import { describe, before, after, it } from 'node:test'
import { Server } from 'node:http'

describe('Testing the Tasks', () => {
  let _server: Server

  before(async () => {
    _server = (await import('../../src/main/config/node')).default

    await new Promise(resolve => _server.once('listening', resolve))
  })

  after(done => _server.close(done))

  it('should get a main router with status code 200', () => {
    fetch('localhost:6000')
  })
})
