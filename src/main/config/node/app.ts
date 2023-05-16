import { IncomingMessage, ServerResponse, createServer } from 'node:http'
import middlewares from './middlewares'
const port = 6000

const handler = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200)
    response.end('ok')
  }
}

middlewares.use(handler)

const app = createServer(middlewares)
  .listen(port, () => console.log('server is running'))

export default app
