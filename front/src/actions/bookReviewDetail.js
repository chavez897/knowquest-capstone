import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getBooksData = (bookId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/books-ratings/book/?book_id=${bookId}`)
        .then((res) => {
          dispatch(getBooksDetailAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getBooksDetailAction = (res) => ({
  type: types.getBookDeatil,
  payload: {
    bookDetail: res
  },
});
