import {Request, Response, NextFunction, RequestHandler} from 'express'
import jwt from 'jsonwebtoken'
import config from './config';
import Token from '../models/token';
const authenticationToken: RequestHandler = async (req:Request, res: Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    res.status(401).json({message:'No token provided'})
    return;
   }


  const token = authHeader.split(' ')[1];

  //check blacklist token
  const isBlacklisted = await Token.findOne({token})
  if(isBlacklisted) {
    res.status(401).json({message:'Token has been invalidated'})
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message:'Invalid Token'})
    return;
  }
}

export default authenticationToken