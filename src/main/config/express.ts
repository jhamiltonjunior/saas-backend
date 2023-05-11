import express from 'express'
import routes from './routes'
import middlewares from './middlewares'
import cors from 'cors'

const app = express()

app.use(cors())

middlewares(app)
routes(app)

export default app
