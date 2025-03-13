import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import { v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import { error } from 'console';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
})

export async function registerUserController(request, response) {
    try {
        let user;
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }
        user = await UserModel.findOne({ email: email })
        if (user) {
            return response.json({
                message: "user Already registered with this email ",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();



        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user = new UserModel({
            email: email,
            password: password,
            name: name,
            otp:verifyCode,
            otpExpires: Date.now() + 600000
        });
        await user.save();

        // Send verification email
        const verifyEmail = await sendEmailFun({
            sendTo: email,
            subject: "Verify email from Ecommerce App",
            text: "",
            html: VerificationEmail()
        });

// Create a JWT token for verification purposes
const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JSON_WEB_TOKEN_SECRET_KEY
);
return response.status(200).json({
    success: true,
    error: false,
    message: "User registered successfully! Please verify your email.",
    token: token, // Optional: include this if needed for verification
});

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export async function registerEmailController(request, response) {
    try {
        const { email, otp } = request.body;
        
        if (!email || !otp) {
            return response.status(400).json({
                message: "Please provide email and OTP",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return response.status(400).json({
                message: "Invalid or expired OTP",
                error: true,
                success: false
            });
        }

        // Xác minh thành công, cập nhật trạng thái tài khoản
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return response.status(200).json({
            success: true,
            error: false,
            message: "Email verified successfully! You can now log in."
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export async function verifyEmailController(request, response) {
    try {
        const { email } = request.body;

        if (!email) {
            return response.status(400).json({
                message: "Please provide an email",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Tạo OTP mới
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Lưu OTP vào database với thời gian hết hạn 10 phút
        user.otp = verifyCode;
        user.otpExpires = Date.now() + 600000; // 10 phút
        await user.save();

        // Gửi email chứa OTP
        await sendEmailFun({
            sendTo: email,
            subject: "Email Verification Code",
            text: `Your verification code is: ${verifyCode}`,
            html: `<p>Your verification code is: <b>${verifyCode}</b></p>`
        });

        return response.status(200).json({
            success: true,
            error: false,
            message: "Verification code sent to email successfully!"
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (user.verifyEmail !== true) {
        response.status(400).json({
            message: "your email is not verify",
            error: true,
            success: false
        });
    }


    const checkPassword = await bcryptjs.compare(password, user.password);

if (!checkPassword) {
    response.status(400).json({
        message: "Contact to admin",
        error: true,
        success: false
    });
}
    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date()
    });
    
    const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };
    
    response.cookie('accessToken', accesstoken, cookiesOption);
    response.cookie('refreshToken', refreshtoken, cookiesOption);
    return response.json({
        message: "Login successfully",
        error: false,
        success: true,
        data: {
            accessToken,
            refreshToken
        }
    });
    
    } catch (error) {
        return reponse.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function logoutController(request, response) {
    try {
        // Xóa cookie chứa accessToken và refreshToken
        response.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: "None" });
        response.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Upload image avatar
var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId; // auth middleware
        const image = request.file;

        const user = await UserModel.findOne({ _id: userId});

        // first remove image from cloudinary
        const userAvatar = user.avatar;
        
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.lenght - 1];
        const imageName = image.split(".")[0];
        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {
                    console.log(error, res);
                }
            );
        }

        if(!user){
            return response.status(500).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        const options ={
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i=0; i<image?.lenght; i++){
            
            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    console.log(result);
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`upload/${request.files[i].filename}`);
                    console.log(request.files[i].filename)
                }
            );
        }
        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avtar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const avatar_image = urlArr[urlArr.lenght - 1];
    const imageName = image.split(".")[0];
    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                console.log(error, res);
            }
        );
        if (res) {
            response.status(200).send(res);
        }
    }
}

// update user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId; // auth middleware
        const {name, email, mobile, password} = request.body;
        const userExist = await UserModel.findById(userId);
        if(!userExist){
            return response.status(400).send('The user cannot be updated!');
        }
            
        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        let hashPassword = "";
        if (password) {
            const salt = bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        } else {
            hashPassword = userExist.password
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email,
                verify_email: email !== userExist.email ? false : true,
                password: hashPassword,
                otp:verifyCode!=="" ? verifyCode : null,
                otpExpires:verifyCode!=="" ? Date.now() + 600000 : ''
            },
            { new: true}
        )

        // send verification email
        if (email !== userExist.email) {
            await sendEmailFun({
                sendTo: email,
                subject: "Verify email fron Ecommerce App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })        
        }
        return response.json({
            message: "User updated successfully",
            error: false,
            success: true,
            user: updateUser
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// forgot pass not login
export async function forgotPasswordController(request, response) {
    try {
        const {email} = request.body;
        const user = await UserModel.findOne({email:email});
        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }else{
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000;
            await user.save();
         
            await sendEmailFun({
                sendTo: email,
                subject: "Verify email fron Ecommerce App",
                text: "",
                html: VerificationEmail(user.name, verifyCode)
            })

            return response.json({
                message: "check email",
                error: false,
                success: true
            })
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(request, response) {
    try {
        const {email, otp} = request.body;
    const user = await UserModel.findOne({email:email});
        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }
        if(!email || !otp){
            return response.status(400).json({
                message: "Provide required email, otp",
                error: true,
                success: false
            })
        }
        if(otp !== user.otp){
            return response.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }
        const currentTime = new Date().toISOString();
        if (user.otpExpires < currentTime) {
            return response.status(400).json({
                message: "OTP is expired",
                error: true,
                success: false
            })
        }
        user.otp = "";
        user.otpExpires ="";
        await user.save();
        return response.status(400).json({
            message: "Verify otp successfully",
            error: true,
            success: false
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// reset password
export async function resetpassword(request, response) {
    try {
        const {email, newPassword, confirmPassword} = request.body;
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "provide required email, newPass, confirmPass"
            })
        }
        const user = await UserModel.findOne({email});
        if (!user) {
            return response.status(400).json({
                message: "email is not available",
                error: true,
                success: false
            })
        }
        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPass and confirmPass must be same",
                error: true,
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(confirmPassword, salt);
        user.password = hashPassword;
        await user.save();
        const update = await UserModel.findByIdAndUpdate(user._id,{
            password: hashPassword
        })
        return response.json({
            message: "Password updated successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// refresh token controller
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1] // [bearer token]
        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifyToken) {
            return response.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }
        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken',newAccessToken,cookiesOption);
        return response.json({
            message: "New access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId;
        const user = await UserModel.findById(userId).select('-passwod -refresh_token');
        return response.json({
            message: "user details",
            error: false,
            success: true,
            data: user
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}