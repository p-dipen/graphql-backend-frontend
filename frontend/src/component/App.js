import React, { Fragment } from "react";
import "../style/App.css";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
