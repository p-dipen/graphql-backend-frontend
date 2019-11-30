import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../logo.svg";
import { AUTH_TOKEN } from "../constants";
import { RouteComponentProps, withRouter } from "react-router";

function Header(props: RouteComponentProps<{}>) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {" React Bootstrap"}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {authToken && (
          <Nav className="ml-auto">
            <Nav.Item className="ml-auto">
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  props.history.push(`/`);
                }}
              >
                Sign Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
