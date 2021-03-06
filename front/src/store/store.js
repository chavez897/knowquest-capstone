import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { tokensReducer } from "../reducers/tokensReducer";
import { partnersReducer } from "../reducers/partnersReducer";
import { contestsReducer } from "../reducers/contestsReducer";
import { booksReducer } from "../reducers/booksReducer";
import { bookReviewDetailReducer } from "../reducers/bookReviewDetailReducer";
import { announcementsReducer } from "../reducers/announcementsReducer";
import { resourceReviewDetailReducer } from "../reducers/resourceReviewDetailReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  user: userReducer,
  tokens: tokensReducer,
  partners: partnersReducer,
  contests: contestsReducer,
  books: booksReducer,
  bookReviewDetail: bookReviewDetailReducer,
  resourceReviewDetail: resourceReviewDetailReducer,
  announcements: announcementsReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
