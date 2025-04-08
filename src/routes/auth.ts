import {Router} from 'express'
import login from '../controllers/users/login'
import register from '../controllers/users/register'
import authenticationToken from '../utils/authenticationToken'
import logout from '../controllers/users/logout'

const authRouter = Router()

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout', authenticationToken, logout)

export default authRouter