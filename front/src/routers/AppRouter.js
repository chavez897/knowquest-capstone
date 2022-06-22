import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import { NavBar } from "../components/ui/NavBar";
import { Footer } from "../components/ui/Footer";
import { HomeScreen } from "../components/home/HomeScreen";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { loginAction } from "../actions/auth";
import { UserRouter } from "./UserRouter";
import { getUserData } from "../actions/user";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { PartnersScreen } from "../components/partners/PartnersScreen";
import { ContestsScreen } from "../components/contests/ContestsScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { BookReviewDetailScreen } from "../components/book-review-detail/BookReviewDetailScreen";
import { FindSchool } from "../components/school/FindSchool";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access !== null && access !== undefined) {
      dispatch(loginAction(access, refresh));
      dispatch(getUserData())
        .then(() => {
          setChecking(false);
        })
        .catch(() => {
          console.log("catch");
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [dispatch, setChecking]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Router>
        <NavBar />
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={!!user.username}
              path="/auth"
              component={AuthRouter}
            />

            <PrivateRoute
              path="/user"
              component={UserRouter}
              isAuthenticated={!!user.username}
            />

            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/search" component={SearchScreen} />
            <Route exact path="/partners" component={PartnersScreen} />
            <Route exact path="/contests" component={ContestsScreen} />
            <Route exact path="/book-review-detail" component={BookReviewDetailScreen} />
            <Route exact path="/findschool" component={FindSchool} />

            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};
