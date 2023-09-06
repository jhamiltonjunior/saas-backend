import { ServerError } from '../errors/serverError'
import { IHttpResponse } from '../ports/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error.message,
})

export const customResponse = (error: Error, statusCode: number): IHttpResponse => ({
  statusCode,
  body: error.message,
})

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
  // token,
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
  // token,
})

export const serverError = (reason: string): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason),
})
