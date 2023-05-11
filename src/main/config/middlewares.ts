import { Express } from 'express'
import { bodyParser, contentType } from '../middleware/express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
}
