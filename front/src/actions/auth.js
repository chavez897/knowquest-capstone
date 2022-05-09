import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";
import { deleteUserAction } from "./user";

export const login = (email, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/auth/token/", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(loginAction(res.data.access, res.data.refresh));
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          resolve(res);
        })
        .catch((error) => {
          reject(error.response.data.errors);
        });
    });
  };
};

export const refresh = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/auth/token/refresh/", {
          refresh: getState().tokens.refresh,
        })
        .then((res) => {
          dispatch(refreshAction(res.data));
          localStorage.setItem("access", res.data.access);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logoutAction());
    dispatch(deleteUserAction());
  };
};

export const refreshAction = (res) => ({
  type: types.refreshTokens,
  payload: {
    access: res.access,
  },
});

export const loginAction = (access, refresh) => ({
  type: types.saveTokens,
  payload: {
    access: access,
    refresh: refresh,
  },
});

export const logoutAction = () => ({
  type: types.deleteTokens,
});
