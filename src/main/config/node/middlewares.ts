import connect from 'connect'
import cors from 'cors'

import contentType from '../../middleware/node/contentType'
import bodyParser from '../../middleware/node/bodyParser'

export default (connect: connect.Server): void => {
  connect.use(cors())
  bodyParser(connect)
  contentType(connect)
}
