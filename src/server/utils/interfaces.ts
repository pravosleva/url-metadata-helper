import { Request as IRequest } from 'express'
import { addsDevicesLoggedState } from './addsDevicesLoggedState'

export interface ICustomRequest extends IRequest {
  id: string;
  loggedMap: typeof addsDevicesLoggedState
  success_url?: string
  swaggerDoc?: any
  query: {
    [key: string]: any
  }
}