import { Router } from 'express'
import { loginUserController,logoutController,verifyEmailController, 
    registerUserController, userAvatarController,removeImageFromCloudinary,
    updateUserDetails,forgotPasswordController,verifyForgotPasswordOtp,
    resetpassword,refreshToken,userDetails,loginAdminController,
    addReview,getReviews,getAllReviews,getAllUsers,authWithGoogle,getAllUsersData,
    sortBy, searchUserController
} from '../controllers/user.controller.js'
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = Router()

userRouter.post('/register', registerUserController);

userRouter.post('/sortBy', sortBy);
userRouter.post('/search/get', searchUserController);

userRouter.post('/verifyEmail',verifyEmailController);
userRouter.post('/login',loginUserController);
userRouter.post('/authWithGoogle',authWithGoogle);
userRouter.post('/login-admin',loginAdminController);
userRouter.get('/logout',auth,logoutController);
userRouter.put('/reset-password',resetpassword);
userRouter.put('/user-avatar',auth,upload.array('avatar'),userAvatarController);
userRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
userRouter.put('/:id',auth,updateUserDetails);
userRouter.post('/forgot-password',forgotPasswordController);
userRouter.post('/verify-forgot-password-otp',verifyForgotPasswordOtp);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails);
userRouter.post('/addReview',auth,addReview);
userRouter.get('/getReviews',getReviews);
userRouter.get('/getAllReviews',getAllReviews);
userRouter.get('/getAllUsers',getAllUsers);
userRouter.get('/getAllUsersData',getAllUsersData);



export default userRouter
