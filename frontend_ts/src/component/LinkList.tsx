import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Alert, Spinner, Row, Col } from "react-bootstrap";
import LinkTable, { LinksProps } from "./LinkTable";
import { _success } from "../utili";
export const POST_LIST = gql`
  {
    postList {
      id
      desciption
      url
    }
  }
`;

export const SUBSCRIPTION_POST = gql`
  subscription {
    newPost {
      mutation
      node {
        id
        desciption
        url
      }
      previousValues {
        id
        desciption
        url
      }
    }
  }
`;
const LinkList: React.FC = React.memo(() => {
  const { loading, error, data, subscribeToMore } = useQuery(POST_LIST);
  if (loading) {
    return (
      <Row className="justify-content-center">
        <Col className="text-center">
          <Spinner animation="grow" />
        </Col>
      </Row>
    );
  }

  if (error) return <Alert variant="danger">{error.message}</Alert>;
  const { postList } = data;

  return (
    <LinkTable
      postList={postList}
      _subscribeToNewLinks={() => {
        subscribeToMore({
          document: SUBSCRIPTION_POST,
          updateQuery: (prev: any, { subscriptionData }: any) => {
            console.log(subscriptionData.data);
            if (!subscriptionData.data) return prev;
            const {
              mutation,
              node,
              previousValues
            } = subscriptionData.data.newPost;
            console.log(mutation);
            if (mutation === "DELETED") {
              const postList = prev.postList.filter(
                ({ id }: LinksProps) => id !== previousValues.id
              );
              _success("Delete successfully");
              return Object.assign({}, { postList: postList });
            } else {
              if (!node) return prev;
              const exists = prev.postList.findIndex(
                ({ id }: LinksProps) => id === node.id
              );
              console.log(exists);
              if (exists > -1) {
                _success("Update successfully");
                const prePost = [...prev.postList];
                prePost[exists] = node;
                return Object.assign({}, { postList: prePost });
              } else {
                _success("Create successfully");
                return Object.assign({}, prev, {
                  postList: [...prev.postList, node]
                });
              }
            }
          }
        });
      }}
    />
  );
});

export default LinkList;
