import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { Container, Row, Col, Button } from "react-bootstrap";
import LinkList from "./LinkList";
import CreateModal from "./CreateModal";

class Home extends Component {
  state = {
    show: false
  };
  handleClose = () => this.setState({ show: false });
  render() {
    return (
      <Container className="mt-2">
        <Row className="text-center">
          <Col md={10}>
            <h1>Post List</h1>
          </Col>
          <Col md={2}>
            <Button onClick={() => this.setState({ show: true })}>
              Add Post
            </Button>
            <CreateModal
              show={this.state.show}
              handleClose={this.handleClose}
            />
          </Col>
        </Row>
        <Row>
          <LinkList />
        </Row>
      </Container>
    );
  }
}

export default withAuthorization(Home);
