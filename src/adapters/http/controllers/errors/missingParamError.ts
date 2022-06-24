import { ControllerError } from './controllerError'

export class MissingParamError extends Error implements ControllerError {
  constructor (paramError: string) {
    super(`Missing Param: ${paramError}`)
    this.message = 'Missing Param Error'
  }
}
