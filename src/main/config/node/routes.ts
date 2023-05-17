import connect from 'connect'

import { readdirSync } from 'fs'

export default (app: connect.Server): void => {
  // eslint-disable-next-line node/no-path-concat
  readdirSync('/home/is_me/.app/saas/backend/tasks/src/main/routes/node').map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../../routes/node/${file}`)).default(app)
    }
  })
}
