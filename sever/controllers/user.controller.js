import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';

export async function registerUserController(request, response) {
    try {
        let user;
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "vui lòng nhập đầy đủ thông tin",
                error: true,
                success: false
            })
        }
        user = await UserModel.findOne({ email: email })
        if (user) {
            return response.json({
                message: "Email này đã được đăng ký",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user = new UserModel({
            email: email,
            password: hashPassword,
            name: name,
            otp:verifyCode,
            otpExpires: Date.now() + 600000
        });
        await user.save();

        // Send verification email
        const content = await sendEmailFun({
            to: email,
            subject: "Xác minh email từ trang web kinh doanh xe đạp PedalPeak",
            text: "",
            html: VerificationEmail(name, verifyCode)
        });

// Create a JWT token for verification purposes
const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JSON_WEB_TOKEN_SECRET_KEY
);
return response.status(200).json({
    success: true,
    error: false,
    message: "Đăng ký thành công! Vui lòng xác minh email của bạn.",
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

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if(isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return response.status(200).json({
                success: true,
                error: false,
                message: "Email xác nhận thành công! Bạn có thể đăng nhập bằng tài khoản này."
            });
        }else if (!isCodeValid) {
            return response.status(400).json({error:true, success: false, message: "Mã OTP không chính xác!"})
        } else {
            return response.status(400).json({error:true, success: false, message: "Mã OTP hết hạn!"})
        }

        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (user.status!="Hoạt động") {
            response.status(400).json({
                message: "Liên hệ admin để kích hoạt lại tài khoản",
                error: true,
                success: false
            });
        }


        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            response.status(400).json({
                message: "Mật khẩu không đúng!",
                error: true,
                success: false
            });
        }
        const accesstoken = await generatedAccessToken(user._id);
     
        const refreshtoken = await generatedRefreshToken(user._id);
      

        // const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
        //     last_login_date: new Date()
        // });
        
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
    
        response.cookie('accessToken', accesstoken, cookiesOption);
        response.cookie('refreshToken', refreshtoken, cookiesOption);
   
        return response.json({
            message: "Đăng nhập thành công!",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshtoken
            }
        });
    
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function logoutController(request, response) {
    try {
        const userid = request.userId //middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        // Xóa cookie chứa accessToken và refreshToken
        response.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: "None" });
        response.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token: ""
        })

        return response.json({
            message: "Đăng xuất thành công!",
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


// export async function verifyEmailController(request, response) {
//     try {
//         const { email } = request.body;

//         if (!email) {
//             return response.status(400).json({
//                 message: "Please provide an email",
//                 error: true,
//                 success: false
//             });
//         }

//         const user = await UserModel.findOne({ email: email });

//         if (!user) {
//             return response.status(404).json({
//                 message: "User not found",
//                 error: true,
//                 success: false
//             });
//         }

//         // Tạo OTP mới
//         const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

//         // Lưu OTP vào database với thời gian hết hạn 10 phút
//         user.otp = verifyCode;
//         user.otpExpires = Date.now() + 600000; // 10 phút
//         await user.save();

//         // Gửi email chứa OTP
//         await sendEmailFun({
//             sendTo: email,
//             subject: "Email Verification Code",
//             text: `Your verification code is: ${verifyCode}`,
//             html: `<p>Your verification code is: <b>${verifyCode}</b></p>`
//         });

//         return response.status(200).json({
//             success: true,
//             error: false,
//             message: "Verification code sent to email successfully!"
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// }

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



