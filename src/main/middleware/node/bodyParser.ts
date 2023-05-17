import bParser from 'body-parser'

import connect from 'connect'

const bodyParser = (connect: connect.Server): void => {
  connect.use(bParser.urlencoded({ extended: false }))
}

export default bodyParser
