import bcrypt from 'bcrypt';
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from '../../models/user';

const TOKEN_EXPIRY = 60 * 60

const login =  async (req: Request , res: any) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if(!user) {
        return res.status(401).json({message:'Invalid credentials'})
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash!);

    if(!passwordCorrect) {
        return res.status(401).json({message:'invalid email or password'});
    }

    const userToken = {
        user: user,
        id:user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET!, {
        expiresIn: TOKEN_EXPIRY
    })

    res.status(200).json({token, user: user, message:'Login Successful'});
}

export default login