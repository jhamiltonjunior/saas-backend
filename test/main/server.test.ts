import { describe, before, after, it } from 'node:test'

// importar o http usar o .once para resovolver e iniciar o servidor

import cors from 'cors'

import express from 'express'
import routes from '../../src/main/config/routes-test'
import middlewares from '../../src/main/config/middlewares'

const app = express()

app.use(cors)

middlewares(app)
routes(app)

describe('Testing', () => {
	let server
  before(async () => {
    // _server = (await import('../../src/main/config/app')).default
    // await new Promise(resolve => app.once('listening', resolve))
	
	server = app.listen(8081, () => {
	  console.log('Test runing at http://localhost:8081')
	})
  })
  
  it()
  
  after(done => server.close())
})
