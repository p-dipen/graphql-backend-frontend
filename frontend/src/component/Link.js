import React, { useState, useEffect } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { _error, _success } from "../utili";
import { POST_LIST } from "./LinkList";
const UPDATEPOST = gql`
  mutation updatePost($id: ID!, $desciption: String!, $url: String!) {
    updatePost(id: $id, desciption: $desciption, url: $url) {
      id
      url
      desciption
    }
  }
`;
const DELETEPOST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
function Link(props) {
  const [post, setPost] = useState({ ...props });
  useEffect(() => {
    setPost(props);
  }, [props]);
  const [edit, setEdit] = useState(false);
  const updateField = e => {
    setPost({
      ...post,
      link: { ...post.link, [e.target.name]: e.target.value }
    });
  };
  const _cancelUpdate = () => {
    setPost(props);
    setEdit(false);
  };
  if (!edit) {
    return (
      <tr>
        <td>{post.index + 1} </td>
        <td>{post.link.desciption}</td>
        <td> {post.link.url}</td>
        <td>
          <ButtonToolbar>
            <Button
              variant="secondary"
              size="sm"
              className="mr-1"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>{" "}
            <Mutation
              mutation={DELETEPOST}
              variables={{
                id: post.link.id
              }}
              onCompleted={() => {
                _success("Delete successfully");
              }}
              onError={_error}
              refetchQueries={() => [{ query: POST_LIST }]}
            >
              {mutation => (
                <Button variant="danger" size="sm" onClick={mutation}>
                  Delete
                </Button>
              )}
            </Mutation>
          </ButtonToolbar>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{post.index + 1} </td>
        <td>
          <input
            className="form-control"
            value={post.link.desciption}
            onChange={updateField}
            name="desciption"
          />
        </td>
        <td>
          <input
            className="form-control"
            value={post.link.url}
            onChange={updateField}
            name="url"
          />
        </td>
        <td>
          <ButtonToolbar>
            <Mutation
              mutation={UPDATEPOST}
              variables={{
                id: post.link.id,
                url: post.link.url,
                desciption: post.link.desciption
              }}
              onCompleted={() => {
                setEdit(false);
                _success("updated successfully");
              }}
              onError={_error}
            >
              {mutation => (
                <Button
                  variant="primary"
                  size="sm"
                  className="mr-1"
                  disabled={
                    post.link.desciption === "" ||
                    post.link.url === "" ||
                    post.link === props.link
                  }
                  onClick={mutation}
                >
                  Save
                </Button>
              )}
            </Mutation>{" "}
            <Button variant="danger" size="sm" onClick={_cancelUpdate}>
              Cancel
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

export default Link;
