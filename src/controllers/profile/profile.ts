import {Request, Response } from 'express'
import User from "../../models/user"

export const getUserProfile = async (req:Request, res:Response) => {
    const userId = (req as any).user.id
    const user = await User.findById(userId)

    if(!user) {
     res.status(404).json({message:'User not found'})
     return;
    }

    res.json({data: user });
}

export const updateUserProfile = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;
    const {full_name, contact_number, email} = req.body 

    await User.findByIdAndUpdate(userId, {full_name,contact_number,email})

    res.json({message:'Profile updated successfully'})
}