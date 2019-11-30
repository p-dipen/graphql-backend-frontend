import * as React from "react";
import "../style/App.css";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./PersonalRouter";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default App;
