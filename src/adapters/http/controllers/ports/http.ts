export interface IHttpResponse {
  statusCode: number
  body: any
  // token?: string
}

export interface IHttpRequest {
  body?: any
  params?: string | any
  headers?: any
}
