import React from "react";
import { BrowserRoute, Redirect, Route } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
}

export default withAuth(AnonRoute);