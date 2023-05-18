import connect from 'connect'
import { createServer } from 'http'

import middlewares from './middlewares'
import routes from './routes'

const app = connect()

middlewares(app)

app.use(routes)

const server = createServer(app)

export default server
