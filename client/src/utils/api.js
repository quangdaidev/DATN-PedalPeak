import axios from "axios";

export const fetchDataFromApi = async (url) => {
    try {
        // const {data} = await axios.get(process.env.REACT_APP_BASE_URL + url)
        const {data} = await axios.get("http://localhost:4000" + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }

}

