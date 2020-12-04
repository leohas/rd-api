/**
 * This service is dedicated to create errors instances.
 * All errors must be created right inside this file and must have these informations:
 * safeMessage - a brief error context as message
 * status - an error status following the http request response codes.
 */

 /** This class creates the error instance */
export class RdError extends Error {
  public status: number
  public safeMessage: string

  public constructor(safeMessage: string, status: number = 500) {
    super(safeMessage)
    this.status = status
    this.safeMessage = safeMessage
  }

  public toJson = () => {
    return { status: this.status, message: this.safeMessage }
  }
}

/** 
 * General errors down below
 * You must create a name ending with 'Error'
 * */

export const invalidApiKeyError = new RdError('You can not use our API, try using a valid API key.', 403)
export const requiredApiKeyError = new RdError('You can not use our API because an API key is required.', 401)
export const requiredEmailError = new RdError('You need to insert your email!', 406)
export const requiredPasswordError = new RdError('You need to insert your password!', 406)
export const requiredEmailAndPasswordError = new RdError('You need to insert your email and password!', 406)