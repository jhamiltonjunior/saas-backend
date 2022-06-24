import { Express } from 'express'
import { bodyParser, contentType } from '../middleware'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
}
