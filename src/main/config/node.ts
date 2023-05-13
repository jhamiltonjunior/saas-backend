import { createServer } from 'node:http'
import { parse } from 'node:url'

const app = createServer((request, response) => {
  if (request.url !== '/') {
    const query = request.url ? parse(request.url, true) : false

    // let query

    // if (request.url !== '/' && request.url) {
    //   query = request.url
    //   console.log(query)
    // }

    console.log(query)
    // response.end('ok')
  }

  response.end('ok')
}).listen(6000, () => console.log('server is running'))

export default app
