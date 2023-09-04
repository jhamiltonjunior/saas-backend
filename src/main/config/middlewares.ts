import { Express } from 'express'
import { bodyParser, contentType } from '../middleware/express'
import cors from 'cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(contentType)
  cors()
}
