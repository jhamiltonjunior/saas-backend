import connect from 'connect'
import cors from 'cors'

import contentType from '../../middleware/node/contentType'
import bodyParser from '../../middleware/node/bodyParser'

const middleware = connect()

middleware.use(cors())

bodyParser(middleware)
contentType(middleware)

export default middleware
