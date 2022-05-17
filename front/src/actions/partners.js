import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getPartnersData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/partners/")
        .then((res) => {
          dispatch(getPartnersDataAction(res.data.results));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getPartnersDataAction = (res) => ({
  type: types.savePartners,
  payload: {
    partners: res
  },
});
