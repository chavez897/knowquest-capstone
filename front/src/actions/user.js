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
    role: res.role,
    school: res.school,
    studyArea: res.studyArea,
    email: res.email,
  },
});

export const deleteUserAction = () => ({
  type: types.deleteUser,
  payload: null,
});
