import { types } from "../types/types";

export const bookReviewDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getBookDeatil:
      return action.payload.bookDetail;
    case types.deleteBookDetail:
      return {};
    default:
      return state;
  }
};