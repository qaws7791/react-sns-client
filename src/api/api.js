import { default as axios } from "axios";
const { VITE_SERVER_URL } = import.meta.env;

console.log(import.meta.env);
console.log(VITE_SERVER_URL);

const instance = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      !storedData?.accessToken ||
      new Date(storedData.expiration) <= new Date()
    )
      return config;
    config.headers.authorization = `Bearer ${storedData.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log("정상 응답 받음: ", response);
    return response;
  },
  (error) => {
    // console.log("오류 응답 받음: ", error);
    return Promise.reject(error);
  }
);

export default instance;
