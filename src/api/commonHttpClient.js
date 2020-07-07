/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue';
import Axios from 'axios';

const notification = (options) => Vue.notify({
  title: 'SmartRecruiters Notification',
  type: 'warn',
  closeOnClick: false,
  ...options,
});

const httpClient = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 5000, // indicates, 1000ms ie. 1 second
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor to catch errors
const errorInterceptor = (error) => {
  notification({
    type: 'error',
    text: error.message,
  });
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => response;

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
