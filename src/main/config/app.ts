import express from 'express'
import routes from './routes'
import middlewares from './middlewares'

const app = express()

middlewares(app)
routes(app)

export default app
