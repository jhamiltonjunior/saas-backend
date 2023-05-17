import connect from 'connect'
import cors from 'cors'

const middleware = connect()
middleware.use(cors())

export default middleware
