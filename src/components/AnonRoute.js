import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? <Component {...props} /> : <Redirect to="/travel" />
      }
    />
  );
}

export default withAuth(AnonRoute);
