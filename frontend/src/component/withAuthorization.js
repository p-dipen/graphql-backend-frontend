import React from "react";
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    UNSAFE_componentWillMount() {
      if (!localStorage.getItem(AUTH_TOKEN)) {
        this.props.history.push(`/`);
      }
    }

    render() {
      return <Component />;
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
