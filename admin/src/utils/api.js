import axios from "axios";
// require('dotenv/config');

export const fetchDataFromApi=async(url)=>{
    try{
        const res = await axios.get("http://localhost:4000"+url);
        return res.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const postData = async (url, formData) => {
    try {
        const res = await axios.post("http://localhost:4000" + url,formData)
        // console.log("gggg",res.data)
        return res.data
    }catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        if (error.response) {
          // Lỗi trả về từ server
          console.error("Lỗi từ server:", error.response.data);
        //   alert("Lỗi: " + error.response.data.message);
        return error.response.data;
        } else {
          // Lỗi khác (không phải do server)
          console.error("Lỗi không phải từ server:", error.message);
        }
    }
}

export const editData = async (url, updateData) => {
    try {
        const res = await axios.put("http://localhost:4000" + url,updateData)
        // console.log("gggg",res.data)
        return res.data
    }catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        if (error.response) {
          // Lỗi trả về từ server
          console.error("Lỗi từ server:", error.response.data);
        //   alert("Lỗi: " + error.response.data.message);
        return error.response.data;
        } else {
          // Lỗi khác (không phải do server)
          console.error("Lỗi không phải từ server:", error.message);
        }
    }
}

export const deleteImages = async (url) => {
    try {
        const res = await axios.delete(`http://localhost:4000${url}`)
        // console.log("gggg",res.data)
        return res.data
    }catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        if (error.response) {
          // Lỗi trả về từ server
          console.error("Lỗi từ server:", error.response.data);
        //   alert("Lỗi: " + error.response.data.message);
        return error.response.data;
        } else {
          // Lỗi khác (không phải do server)
          console.error("Lỗi không phải từ server:", error.message);
        }
    }
}

export const deleteData = async (url) => {
  try {
      const res = await axios.delete(`http://localhost:4000${url}`)
      // console.log("gggg",res.data)
      return res.data
  }catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      if (error.response) {
        // Lỗi trả về từ server
        console.error("Lỗi từ server:", error.response.data);
      //   alert("Lỗi: " + error.response.data.message);
      return error.response.data;
      } else {
        // Lỗi khác (không phải do server)
        console.error("Lỗi không phải từ server:", error.message);
      }
  }
}