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
import { SystemRouter } from "./SystemRouter";
import { getUserData } from "../actions/user";
import { LoadingScreen } from "../components/ui/LoadingScreen";

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
      <NavBar />
      <Router>
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={!!user.username}
              path="/auth"
              component={AuthRouter}
            />

            {/* <PrivateRoute
              path="/"
              component={SystemRouter}
              isAuthenticated={!!user.username}
            /> */}

            <Route exact path="/home" component={HomeScreen} />

            <Redirect to="/home" />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};
