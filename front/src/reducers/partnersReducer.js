import { types } from "../types/types";

export const partnersReducer = (state = [], action) => {
  switch (action.type) {
    case types.savePartners:
      return action.payload.partners;
    case types.deletePartners:
      return [];
    default:
      return state;
  }
};
