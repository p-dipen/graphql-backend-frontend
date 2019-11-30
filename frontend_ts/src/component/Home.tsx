import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LinkList from "./LinkList";
import CreateModal from "./CreateModal";

function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Container className="mt-2">
      <Row className="text-center">
        <Col md={10}>
          <h1>Post List</h1>
        </Col>
        <Col md={2}>
          <Button onClick={() => setShow(true)}>Add Post</Button>
          <CreateModal show={show} handleClose={handleClose} />
        </Col>
      </Row>
      <Row>
        <LinkList />
      </Row>
    </Container>
  );
}

export default Home;
