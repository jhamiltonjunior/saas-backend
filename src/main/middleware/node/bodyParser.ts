import bodyParser from 'body-parser'

import connect from 'connect'

export default (connect: connect.Server): void => {
  connect.use(bodyParser.urlencoded({ extended: false }))
}
