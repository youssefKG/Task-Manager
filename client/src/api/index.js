import axios from "axios";

axios.defaults.baseURL = "http://localhost:1900/api";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    console.log("axios response : ", response);
    return response.data;
  },
  (error) => {
    console.log("error axios : ", error);
    return {
      message: error.response.data.message || error.message,
      status: error.response.data?.status,
      result: error.response.data?.result,
    };
  },
);

class Api {
  post(endPoint, data) {
    return axios.post(endPoint, data);
  }
  get(endPoint) {
    return axios.get(endPoint);
  }
  delete(endPoint) {
    return axios.delete(endPoint);
  }
  put(endPoint, newData) {
    return axios.put(endPoint, newData);
  }
}

const api = new Api();

export default api;
