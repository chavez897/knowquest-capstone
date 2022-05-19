import { types } from "../types/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.saveUser:
      return {
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        school: action.payload.school,
        studyArea: action.payload.studyArea,
        email: action.payload.email
      };
    case types.deleteUser:
      return {};
    default:
      return state;
  }
};
