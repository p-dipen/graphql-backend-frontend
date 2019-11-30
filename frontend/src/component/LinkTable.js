import React, { Component } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import Link from "./Link";

class LinkTable extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>URL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.postList.map((link, index) => {
                  return <Link key={link.id} link={link} index={index} />;
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LinkTable;
