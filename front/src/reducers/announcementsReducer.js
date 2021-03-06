import { types } from "../types/types";

export const announcementsReducer = (state = [], action) => {
  switch (action.type) {
    case types.saveAnnouncements:
      return action.payload.annoucements;
    case types.deleteAnnouncements:
      return [];
    default:
      return state;
  }
};
