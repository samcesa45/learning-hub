import express,{Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/user';

const register = async (req:Request, res:Response) => {
    const {username, password} = req.body;

    if(!username || !password) {
        res.status(400).json({message:'username and password are required'})
        return;
    }

    const existingUser = await User.findOne({username})
    if(existingUser) {
         res.status(400).json({message:'username already taken'})
         return;
    }

    const saltRounds = Number(process.env.SALT_ROUNDS);
    if (isNaN(saltRounds)) {
         res.status(500).json({ message: 'Salt rounds are not set properly in the environment variables.' });
         return;
      }
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        passwordHash
    })

   try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export default register