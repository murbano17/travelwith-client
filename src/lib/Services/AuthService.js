import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }
  signup({
    username,
    email,
    password,
    profilePic,
    userFrom,
    userBirthdate,
    about,
  }) {
    return this.auth
      .post("/signup", {
        username,
        email,
        password,
        profilePic,
        userFrom,
        userBirthdate,
        about,
      })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/logout", {}).then(({ data }) => data);
  }
}
const axiosRequestFunctions = new Auth();
export default axiosRequestFunctions;
