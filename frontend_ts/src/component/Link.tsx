import React, { useState, useEffect, MouseEvent } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { _error } from "../utili";
import { LinksProps } from "./LinkTable";
import { ApolloError } from "apollo-client";

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

interface LinkProps {
  index: number;
  link: LinksProps;
}

const Link: React.FC<LinkProps> = React.memo((props: LinkProps) => {
  console.log("link");

  const [post, setPost] = useState<LinkProps>(props);
  useEffect(() => {
    setPost(props);
  }, [props]);

  const [edit, setEdit] = useState(false);

  const updateField = (e: any) => {
    setPost({
      ...post,
      link: { ...post.link, [e.target.name]: e.target.value }
    });
  };

  const [deletPost] = useMutation(DELETEPOST, {
    // onCompleted: () => {
    //   _success("Delete successfully");
    // },
    onError: (error: ApolloError) => {
      _error(error);
    }
  });

  const [updatePost] = useMutation(UPDATEPOST, {
    onCompleted: () => {
      setEdit(false);
      // _success("updated successfully");
    },
    onError: (error: ApolloError) => {
      _error(error);
    }
  });

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
            <Button
              variant="danger"
              size="sm"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                deletPost({
                  variables: {
                    id: post.link.id
                  }
                });
              }}
            >
              Delete
            </Button>
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
            <Button
              variant="primary"
              size="sm"
              className="mr-1"
              disabled={
                post.link.desciption === "" ||
                post.link.url === "" ||
                post.link === props.link
              }
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                updatePost({
                  variables: {
                    id: post.link.id,
                    url: post.link.url,
                    desciption: post.link.desciption
                  }
                });
              }}
            >
              Save
            </Button>{" "}
            <Button variant="danger" size="sm" onClick={_cancelUpdate}>
              Cancel
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default Link;
