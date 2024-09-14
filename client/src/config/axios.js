import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:1900/api",
  withCredentials: true,
});

export default instanceAxios;
