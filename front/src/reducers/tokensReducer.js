import { types } from "../types/types";

export const tokensReducer = (state = {}, action) => {
  switch (action.type) {
    case types.saveTokens:
      return {
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
    case types.refreshTokens:
      return {
        ...state,
        access: action.payload.access,
      };
    case types.deleteTokens:
      return {};
    default:
      return state;
  }
};
