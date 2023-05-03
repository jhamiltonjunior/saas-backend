import { config as dotenvConfig } from 'dotenv'

import app from './config/app'

dotenvConfig()

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})

// captura erros não tratados
// se não tiver ele o sistema quebra
process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})

export default { app }
