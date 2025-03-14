import { Router } from 'express'
import { loginUserController,logoutController,verifyEmailController, registerUserController } from '../controllers/user.controller.js'
import auth from '../middlewares/auth.js'

const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verifyEmail',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.get('/logout',auth,logoutController)

export default userRouter
