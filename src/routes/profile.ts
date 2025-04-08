import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profile/profile';
const profileRouter = Router()

profileRouter.get('/',getUserProfile)
profileRouter.put('/:id', updateUserProfile)

export default profileRouter