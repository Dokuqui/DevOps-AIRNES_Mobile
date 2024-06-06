import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://167.114.113.203:5555";

const APIRequest = async (method, url, data) => {
    try {
        const token = await AsyncStorage.getItem("Token");
        let response;
        
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        };

        if (method.toLowerCase() === "delete") {
            response = await axios.delete(`${API_URL}/${url}`, { headers });
        } else if (method.toLowerCase() === "put") {
            response = await axios.put(`${API_URL}/${url}`, data, { headers });
        } else if (method.toLowerCase() === "get") {
            response = await axios.get(`${API_URL}/${url}`, { headers });
        } else {
            response = await axios[method.toLowerCase()](`${API_URL}/${url}`, data, { headers });
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }

        return { success: false, error: "Network error" };
    }
}

export { APIRequest, API_URL };
