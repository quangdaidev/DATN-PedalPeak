import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = process.env.REACT_APP_BASE_URL;
// const apiUrl = "http://localhost:4000";

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

export const fetchDataFromApi = async (url) => {
    try {
        // const {data} = await axios.get(process.env.REACT_APP_BASE_URL + url)
        const res = await axios.get("http://localhost:4000" + url)
        return res.data;
    } catch (error) {
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

export const uploadImage = async (url, updatedData) => {

  try{
    const params = localStorage.getItem('accessToken');
    const res = await axios.put(`http://localhost:4000${url}`,updatedData,params);
    return res.data;
  } catch (error) {
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

export const editData = async (url, updatedData) => {
  try{
    const params = localStorage.getItem('accessToken');
    const res = await axios.put(`http://localhost:4000${url}`,updatedData,params);
    return res.data;
  } catch (error) {
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
    const params = localStorage.getItem('accessToken');
    const res = await axios.delete(`http://localhost:4000${url}`,params)
    return res.data

  } catch (error) {
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



// export const postData = async (url, formData) => {
//     try {
//         const response = await  axios.post("http://localhost:4000" + url, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem("token")}`, // Include your API key in the Authorization 
//                 'Content-Type': 'application/json', // Adjust the content type as needed
//             },
//             body: JSON.stringify(formData)
//         }); 
//         console.log("hahaah")
//     } catch (error) {
//         console.log(error)
//     }
// }
   


