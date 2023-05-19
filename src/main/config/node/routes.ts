import { readdirSync } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import path from 'path'

export default (request: IncomingMessage, response: ServerResponse): void => {
  readdirSync(path.resolve('src', 'main', 'routes', 'node')).map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../../routes/node/${file}`)).default(request, response)
    }
  })
}
