import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getAnnouncementsData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/announcements/")
        .then((res) => {
          dispatch(getAnnouncementsDataAction(res.data.results));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getAnnouncementsDataAction = (res) => ({
  type: types.saveAnnouncements,
  payload: {
    annoucements: res
  },
});