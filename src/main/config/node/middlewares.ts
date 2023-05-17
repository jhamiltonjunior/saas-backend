import connect from 'connect'
import cors from 'cors'
import bodyParser from 'body-parser'

const middleware = connect()
middleware.use(cors())
middleware.use(bodyParser.urlencoded({ extended: false }))

export default middleware
