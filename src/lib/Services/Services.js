import axios from "axios";

class AxiosMethods {
  constructor() {
    this.axiosBaseRoute = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getTravels() {
    return this.axiosBaseRoute
    .get("/travel", {})
    .then(({ data }) => data);
  }
}

const axiosRequestMethods = new AxiosMethods();
export default axiosRequestMethods;
