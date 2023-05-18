import { readdirSync } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'

export default (request: IncomingMessage, response: ServerResponse): void => {
  // eslint-disable-next-line node/no-path-concat
  readdirSync('/home/is_me/.app/saas/backend/tasks/src/main/routes/node').map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../../routes/node/${file}`)).default(request, response)
    }
  })
}
