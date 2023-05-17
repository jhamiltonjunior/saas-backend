// response.writeHead(200, { 'Content-Type': 'application/json' })
// response.write(JSON.stringify(responseBody)

import bodyParser from 'body-parser'
import connect from 'connect'

const contentType = (connect: connect.Server): void => {
  connect.use(bodyParser.urlencoded({ type: 'json' }))
}

export default contentType
