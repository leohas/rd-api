import { Request, Response, RequestHandler, NextFunction } from 'express'
import { fbRef } from './firebase'
import { requiredApiKeyError, invalidApiKeyError } from './errors'

/**
 * This service is dedicated to general middlewares used by the whole API.
 * All middleware functions must have 3 params:
 * req - to deal with request
 * res - to deal with response
 * next - to pass the execution foward
 */

 export const checkApiKey: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const { key } = req.headers
     const apiKey: string = (await fbRef.child('secrets/apiKey').once('value')).val()

     if (!key) throw requiredApiKeyError
     if (key && key !== apiKey) throw invalidApiKeyError

     next()
   } catch (error) {
     return res.send(error.toJson())
   }
 }
