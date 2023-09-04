import express from 'express'
import routes from './routes'
import middlewares from './middlewares'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:3000',
  ]
}))

middlewares(app)
routes(app)

export default app
