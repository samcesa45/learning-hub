import {Request} from 'express'
import {IUser} from './src/interface/interface'


declare module 'express' {
    export interface Request {
        user?: IUser
    }
}