import { config as dotenvConfig } from 'dotenv'

// import { PostgresUserRepository } from '@src/external/database/postgreSQL/user/postgresUserRepository'

import app from './config/app'

dotenvConfig()

// const connectionObject = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.BD_TABLE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// }

// new PostgresUserRepository(connectionObject).getPermission('ebceb0cf-0c02-470e-b50e-32f5e6096756')

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})

// captura erros não tratados
// se não tiver ele o sistema quebra
process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
