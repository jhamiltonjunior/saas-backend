import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  // eslint-disable-next-line node/no-path-concat
  readdirSync('/home/is_me/.app/saas/backend/tasks/src/main/routes').map(async (file) => {
    if (!file.includes('.test.' || '.spec.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
