import { types } from "../types/types";

export const announcementsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.saveAnnouncements:
      return {
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
    case types.refreshAnnouncements:
      return {
        ...state,
        access: action.payload.access,
      };
    case types.deleteAnnouncements:
      return {};
    default:
      return state;
  }
};