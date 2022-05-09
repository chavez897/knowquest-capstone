import { types } from "../types/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.saveUser:
      return {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        lastName: action.payload.lastName,
      };
    case types.deleteUser:
      return {};
    default:
      return state;
  }
};
