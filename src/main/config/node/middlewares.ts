import connect from 'connect'
import cors from 'cors'

const middileware = connect()

middileware.use((request, response, next) => {
  middileware.use(cors())
  next()
})

export default middileware
