import { Router } from 'express';
import { getUserById, getUserProfile, updateUserProfile } from '../controllers/profile/profile';
const profileRouter = Router()

profileRouter.get('/',getUserProfile)
profileRouter.get('/:id',getUserById)
profileRouter.put('/:id', updateUserProfile)

export default profileRouter