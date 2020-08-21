import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

function PrivateRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default withAuth(PrivateRoute);
