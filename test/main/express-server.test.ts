import { describe, before, after, it } from 'node:test'
import { once } from 'node:events'
import { config as dotenvConfig } from 'dotenv'

// importar o http usar o .once para resovolver e iniciar o servidor

import cors from 'cors'

import express from 'express'
import routes from '../../src/main/config/node/routes'
import middlewares from '../../src/main/config/middlewares'
import { equal, strictEqual } from 'node:assert'

dotenvConfig()

const app = express()

app.use(cors)

middlewares(app)
routes(app)

describe('Testing the Tasks', async () => {
  before(async () => {
    // let _server = (await import('../../src/main/config/app')).default
    await Promise.resolve(() => app.listen(6001))

    console.log('oi')

    // app.listen(6001)
  })

  it('should get a main router with status code 200', async () => {
    const statusCode = app.get('/tasks', (req, res) => {
      console.log('res.status')
      return res.status
    })
    console.log('res.status')

    // console.log(statusCode)

    // strictEqual(statusCode, 200)
  })

  it('should create the user without no content (name, or email, or password, or mobilePhone, or cpf/Cnpj)', () => {
    app.post('/tasks/register', (req, res) => {
      strictEqual('res.body', '')
    })
  })

  after(() => app.listen().close())
})
