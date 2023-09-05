import { IHttpResponse } from '../../../../../adapters/http/controllers/ports/http'

export const createClient = async (content: IHttpResponse): Promise<any> => {
  // eslint-disable-next-line no-undef
  const data = await fetch(String(process.env.ASAAS_CUSTOMERS_SANDBOX), {
    method: 'POST',
    body: `{  "name": "${content.body.name}",
    "email": "${content.body.email}",
    "mobilePhone": "${content.body.mobilePhone}",
    "cpfCnpj": "${content.body.cpfCnpj}",
    "notificationDisabled": ${content.body.notificationDisabled}
  }`,
    headers: {
      'Content-Type': 'application/json',
      access_token: `${process.env.ASAAS_API_KEY_SANDBOX}`
    },
  })

  return data
}
