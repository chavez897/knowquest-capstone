import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getResourcesData = (resourceId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/resources-ratings/resource/?resource_id=${resourceId}`)
        .then((res) => {
          dispatch(getResourcesDetailAction(res.data.results[0]));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getResourcesDetailAction = (res) => ({
  type: types.getResourceDeatil,
  payload: {
    resourceDetail: res
  },
});
