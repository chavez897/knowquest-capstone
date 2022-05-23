import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getContestsData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/contests/")
        .then((res) => {
          dispatch(getContestsDataAction(res.data.results));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getContestsDataAction = (res) => ({
  type: types.saveContests,
  payload: {
    contests: res
  },
});
