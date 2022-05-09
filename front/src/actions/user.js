import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getUserData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/users/me/")
        .then((res) => {
          dispatch(getUserDataAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getUserDataAction = (res) => ({
  type: types.saveUser,
  payload: {
    id: res.id,
    username: res.username,
    name: res.name,
    lastName: res.lastName,
  },
});

export const deleteUserAction = () => ({
  type: types.deleteUser,
  payload: null,
});
