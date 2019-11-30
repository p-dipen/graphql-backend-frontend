import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../logo.svg";
import { AUTH_TOKEN } from "../constants";
import { withRouter } from "react-router";
// import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
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
              {/* <LinkContainer to="/home">
                <Nav.Item>
                  <Nav.Link>Post</Nav.Link>
                </Nav.Item>
              </LinkContainer> */}
              <Nav.Item className="ml-auto">
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
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
}

export default withRouter(Header);
