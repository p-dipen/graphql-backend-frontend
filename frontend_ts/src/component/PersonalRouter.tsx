import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
const fakeAuth = {
  isAuthenticated: localStorage.getItem(AUTH_TOKEN)
};

export const PrivateRoute: React.ComponentType<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
