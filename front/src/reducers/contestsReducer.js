import { types } from "../types/types";

export const contestsReducer = (state = [], action) => {
  switch (action.type) {
    case types.saveContests:
      return action.payload.contests;
    case types.deleteContests:
      return [];
    default:
      return state;
  }
};
