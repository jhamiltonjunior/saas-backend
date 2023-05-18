import { readdirSync } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'

export default (request: IncomingMessage, response: ServerResponse): void => {
  readdirSync('/home/is_me/.app/saas/backend/tasks/src/main/routes/node').map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../../routes/node/${file}`)).default(request, response)
    }
  })
}
