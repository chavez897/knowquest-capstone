/* eslint-disable default-case */
import axios from "axios";
import { logout, refresh } from "../actions/auth";
import { store } from "../store/store";

export const axiosInstance = axios.create({
  baseURL: `http://127.0.0.1:8000`,
});

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}
const { getState, dispatch } = store;

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    switch (config.url) {
      case "/auth/token/":
      case "/auth/verify/":
      case "/auth/token/refresh/":
        return config;
    }
    const tokenAccess = getState().tokens.access;
    if (tokenAccess) {
      config.headers.Authorization = `Bearer ${tokenAccess}`;
    }
    // Set locale headers
    config.headers["Accept-Language"] = "en-US";
    return config;
  },
  (error) => {
    // noinspection JSIgnoredPromiseFromCall
    Promise.reject(error);
  }
);
// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { config, response } = error;
    const originalRequest = config;

    if (
      response &&
      response.status === 401 &&
      originalRequest.url === `/auth/token/refresh/`
    ) {
      dispatch(logout());
      isAlreadyFetchingAccessToken = false;
      return Promise.reject(error);
    } else if (
      response &&
      response.status === 401 &&
      config.url !== "/auth/token/"
    ) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        dispatch(refresh()).then((accessToken) => {
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(accessToken);
        });
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber(() => {
          const tokenAccess = getState().tokens.access;
          originalRequest.headers["Authorization"] = "Bearer " + tokenAccess;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);
