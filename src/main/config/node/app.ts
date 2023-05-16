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

// app.on('request', function (request, response) {
//   console.log(`METHOD: ${request.method}; URL: ${request.url}`)
//   switch (request.method) {
//     case 'GET':
//     case 'PUT':
//     case 'POST':
//     case 'PATCH':
//     case 'DELETE':
//       response.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       response.end(JSON.stringify({ dummy: 'dummy' }))
//       break
//     default:
//       response.writeHead(405, {
//         'Content-Type': 'application/json'
//       })
//       response.end(JSON.stringify({ error: `method ${request.method} not allowed` }))
//       break
//   }
// })

export default app

// if (request.url !== '/') {
// const query = request.url ? parse(request.url, true) : false

//   // let query

//   // if (request.url !== '/' && request.url) {
//   //   query = request.url
//   //   console.log(query)
//   // }

//   console.log(query)
//   // response.end('ok')
// return
// }
