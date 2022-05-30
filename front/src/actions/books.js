import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getBooksData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/books/")
        .then((res) => {
          dispatch(getBooksDataAction(res.data.results));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getBooksDataAction = (res) => ({
  type: types.saveBooks,
  payload: {
    books: res
  },
});
