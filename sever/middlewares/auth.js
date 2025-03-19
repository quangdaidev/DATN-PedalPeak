import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {

  try {

    // console.log("teken:-------:::", request?.headers)
    const token = request.query.token || request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1] || request?.headers?.accessToken;

    if (!token) {
      return response.status(401).json({
        message: "Vui lòng cung cấp mã token"
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

if (!decode) {
  return response.status(401).json({
    message: "Bạn đang truy cập trái phép!",
    error: true,
    success: false
  });
}

request.userId = decode.id;

next();


  } catch (error) {
    return response.status(500).json({
      message: "Bạn đã kết thúc phiên đăng nhập", // error.message || error,
      error: true,
      success: false
    });
  }
};

export default auth
