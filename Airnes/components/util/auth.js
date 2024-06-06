import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./helper";


async function authenticate(mode, email, password, firstName, lastName) {
  if (mode === "signUp") {
    try {
      let response = await axios.post(`${API_URL}/Users`, {
        Mail: email,
        Password: password,
        Firstname: firstName,
        Lastname: lastName,
      });

      if (response.data.success) {
        let token = response.data.return.Token;
        await AsyncStorage.setItem("Token", token);
        return token;
      } else {
        throw new Error(response.data.return || "Registration failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.return || "Registration failed");
    }
  } else if (mode === "login") {
    try {
      let response = await axios.post(`${API_URL}/Users/login`, {
        Mail: email,
        Password: password,
      });

      if (response.data.success) {
        let token = response.data.return.Token;
        await AsyncStorage.setItem("Token", token);
        return token;
      } else {
        throw new Error(response.data.return || "Login failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.return || "Login failed");
    }
  } else {
    throw new Error("Invalid authentication mode!");
  }
}

export function createUser(email, password, firstName, lastName) {
  return authenticate("signUp", email, password, firstName, lastName);
}

export function login(email, password) {
  return authenticate("login", email, password);
}

const getUserInfo = async () => {
  try {
      const token = await AsyncStorage.getItem("Token");
      if (!token) {
          return null;
      }

      const response = await axios.get(`${API_URL}/Users/me`, {
          headers: {
              authorization: token,
          },
      });

      if (!response.data.success) {
          return null;
      }

      response.data.return.FirstName = response.data.return.FirstName.charAt(0).toUpperCase() + response.data.return.FirstName.slice(1).toLowerCase();
      response.data.return.LastName = response.data.return.LastName.charAt(0).toUpperCase() + response.data.return.LastName.slice(1).toLowerCase();
      return response.data.return;
  } catch (error) {
      return null;
  }
}

export { getUserInfo };