import connect from 'connect'
import cors from 'cors'
import bodyParser from 'body-parser'
import contentType from '@src/main/middleware/node/contentType'

const middleware = connect()

middleware.use(cors())

contentType(middleware)

middleware.use(bodyParser.urlencoded({ extended: false }))

export default middleware
