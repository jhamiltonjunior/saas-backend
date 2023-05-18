import connect from 'connect'
import { createServer } from 'http'

import middlewares from './middlewares'
import routes from './routes'

const app = connect()

middlewares(app)

app.use(routes)

// routes(app)

const server = createServer(app)

export default server

// import { IncomingMessage, ServerResponse, createServer } from 'node:http'
// import middleware from './middlewares'
// // import connect from 'connect'
// // import compression from 'compression'

// // middleware.use(cors())

// const handler = async (request: IncomingMessage, response: ServerResponse) => {
//   if (request.url === '/' && request.method === 'GET') {
//     response.writeHead(200)
//     response.end(`${response.statusCode}`)
//   }
// }

// middleware.use(handler)

// const app = createServer(middleware)
//   .listen(8000, () => console.log('server is running'))

// export default app
