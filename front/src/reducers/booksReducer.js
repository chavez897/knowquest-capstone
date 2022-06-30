import { types } from "../types/types";

export const booksReducer = (state = [], action) => {
  switch (action.type) {
    case types.saveBooks:
      return action.payload.books;
    case types.deleteBooks:
      return [];
    default:
      return state;
  }
};