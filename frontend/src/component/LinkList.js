import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Alert, Spinner, Row, Col } from "react-bootstrap";
import LinkTable from "./LinkTable";

export const POST_LIST = gql`
  {
    postList {
      id
      desciption
      url
    }
  }
`;

class LinkList extends Component {
  render() {
    return (
      <Query query={POST_LIST}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Row className="justify-content-center">
                <Col className="text-center">
                  <Spinner animation="grow" />
                </Col>
              </Row>
            );
          if (error) return <Alert className="danger">error.message</Alert>;
          const { postList } = data;
          return <LinkTable postList={postList} />;
        }}
      </Query>
    );
  }
}

export default LinkList;
