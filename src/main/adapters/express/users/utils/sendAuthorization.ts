/*
  autoriza outro app a atualizar o banco de dados com o id do customer asaas
*/

import amqp from 'amqplib/callback_api'

export const sendAuthorization = (emailAndIdClient: string): void => {
  amqp.connect('amqp://localhost', function (error0: any, connection: any) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1: any, channel: any) {
      if (error1) {
        throw error1
      }
      const queue = 'createClient'

      channel.assertQueue(queue, {
        durable: false
      })

      channel.sendToQueue(queue, Buffer.from(emailAndIdClient))
    })

    setTimeout(function () {
      connection.close()
      // process.exit(0)
    }, 10)
  })
}
