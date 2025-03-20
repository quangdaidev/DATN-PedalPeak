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
        const { name, email, password,confirmPassword } = request.body
        if (!name || !email || !password ||!confirmPassword) {
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

        if (password !== confirmPassword) {
            return response.status(400).json({
                message: "Xác nhận mật khẩu không khớp",
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
            subject: "Xác minh email từ trang web PedalPeak",
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
    message: "Đăng ký thành công! Kiểm tra email để xác minh tài khoản.",
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
                message: "Email xác nhận thành công! Mời bạn đăng nhập."
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

        if (user.status!=="Hoạt động") {
            response.status(400).json({
                message: "Liên hệ admin để kích hoạt lại tài khoản",
                error: true,
                success: false
            });
        }

        if (user.verify_email!==true) {
            response.status(400).json({
                message: "Vui lòng xác thực email của bạn",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return response.status(400).json({
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

// Upload image avatar
var imagesArr = [];
export async function userAvatarController(request, response) {

    try {
        imagesArr = [];

        const userId = request.userId; // auth middleware
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId});

        // first remove image from cloudinary
        
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];

        const imageName =avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {
                    // console.log(error, res);
                }
            );
        }

        if(!user){
            return response.status(500).json({
                message: "Không tìm thấy tài khoản người dùng",
                error: true,
                success: false
            })
        }

        const options ={
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i=0; i<image?.length; i++){
            
            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    // console.log(result);
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    // console.log(request.files[i].filename)
                }
            );
        }
        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
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
    const imgUrl = request.query.img; // '/api/user?img=?img1.jpg'
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];
    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error, res);
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
            return response.status(400).send('Tài khoản không tồn tại!');
        }
            
        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
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
                to: email,
                subject: "Xác minh email từ PedalPeak",
                text: "",
                html: VerificationEmail(userExist.name, verifyCode)
            })        
        }
        
        return response.json({
            message: "Cập nhật tài khoản thành công",
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
                message: "Email này chưa được đăng ký!",
                error: true,
                success: false
            })
        }else{
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            const updateUser = await UserModel.findByIdAndUpdate(
                user?._id,
                {
                    opt: verifyCode,
                    otpExpires: Date.now() + 600000
                }
                
            )
            
            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000;
            await user.save();
         
            await sendEmailFun({
                to: email,
                subject: "Xác nhận mã OPT từ PedalPeak",
                text: "",
                html: VerificationEmail(user.name, verifyCode)
            })

            return response.json({
                message: "Mã OTP gửi thành công",
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
                message: "Email này chưa được đăng ký!",
                error: true,
                success: false
            })
        }
        if(!email || !otp){
            return response.status(400).json({
                message: "Bạn cần cung cấp email và mã OTP",
                error: true,
                success: false
            })
        }
        if(otp !== user.otp){
            return response.status(400).json({
                message: "Mã OTP không đúng!",
                error: true,
                success: false
            })
        }
        const currentTime = new Date().toISOString();
        if (user.otpExpires < currentTime) {
            return response.status(400).json({
                message: "Mã OTP đã hết hạn!",
                error: true,
                success: false
            })
        }
        user.otp = "";
        user.otpExpires ="";

        await user.save();

        return response.status(200).json({
            message: "Xác nhận mã OTP thành công!",
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

// reset password
export async function resetpassword(request, response) {
    try {
        const {email, newPassword, confirmPassword} = request.body;
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }

        const user = await UserModel.findOne({email});

        if (!user) {
            return response.status(400).json({
                message: "Email này chưa được đăng ký!",
                error: true,
                success: false
            })
        }
        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "Mật khẩu mới và Xác nhận mật khẩu mới không khớp!",
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
            message: "Cập nhật mật khẩu thành công!",
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
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1] || request?.headers?.refreshToken// [bearer token]
        if (!refreshToken) {
            return response.status(401).json({
                message: "Mã token không hợp lệ!",
                error: true,
                success: false
            })
        }
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN);
       
        if (!verifyToken) {
            return response.status(401).json({
                message: "Mã token đã hết hạn!",
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
            message: "Mã token mới đã được tạo thành công!",
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

        const user = await UserModel.findById(userId).select('-password -refresh_token');
       
        return response.json({
            message: "Thông tin chi tiết tài khoản",
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









