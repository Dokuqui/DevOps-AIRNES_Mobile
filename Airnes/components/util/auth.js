// import axios from "axios";

// // const googleApi = process.env.EXPO_PUBLIC_API_KEY_GOOGLE;


// async function authenticate(mode, email, password) {
//   // const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${googleApi}`;

//   // const response = await axios.post(url, {
//   //   email: email,
//   //   password: password,
//   //   returnSecureToken: true,
//   // });

//   // const token = response.data.idToken;

//   // return token;
// }

// export function createUser(email, password) {
//   return authenticate("signUp", email, password);
// }

// export function login(email, password) {
//   return authenticate("signInWithPassword", email, password);
// }

const users = {}; // In-memory store for users

async function authenticate(mode, email, password) {
  if (mode === "signUp") {
    if (users[email]) {
      throw new Error("User already exists!");
    }
    users[email] = { email, password };
    return "dummy-signup-token"; // Simulated token for signup
  } else if (mode === "signInWithPassword") {
    if (!users[email] || users[email].password !== password) {
      throw new Error("Invalid email or password!");
    }
    return "dummy-login-token"; // Simulated token for login
  } else {
    throw new Error("Invalid authentication mode!");
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
