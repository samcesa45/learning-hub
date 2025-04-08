import {Request, Response, RequestHandler} from 'express'
import jwt from 'jsonwebtoken';
import config from '../../utils/config';
import Token from '../../models/token';
const logout:RequestHandler = async(req:Request,res:Response) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      res.status(400).json({message:'Authorization header missing'});
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET!) as jwt.JwtPayload;
        
        if (!decoded.exp) {
            res.status(400).json({ message: 'Token missing expiration' });
            return;
        }

        await Token.create({
            token,
            expiresAt: new Date((decoded as any).exp * 1000)
        })

       res.json({message:'Logout Successfully'})
    } catch (error) {
       res.status(401).json({message:'Invalid Token'})
    }

}

export default logout