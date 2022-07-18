import { types } from "../types/types";

export const resourceReviewDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getResourceDeatil:
      return action.payload.resourceDetail;
    case types.deleteResourceDetail:
      return {};
    default:
      return state;
  }
};