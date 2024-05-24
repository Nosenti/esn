// axiosInterceptors.js

import axios from "axios";

// Add a request interceptor
export const HttpInterceptorReq = axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("Request sent:", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
export const HttpInterceptorResp = axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("Response received:", response.data);
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
