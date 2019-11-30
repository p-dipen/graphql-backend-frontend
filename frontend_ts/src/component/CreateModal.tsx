import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";
// import { POST_LIST } from "./LinkList";
import { _error } from "../utili";
import { ApolloError } from "apollo-client";

const CREATEPOST = gql`
  mutation CreatePost($url: String!, $desciption: String!) {
    createPost(url: $url, desciption: $desciption) {
      id
      desciption
      url
    }
  }
`;

const schema = yup.object({
  url: yup.string().required(),
  desciption: yup.string().required()
});

interface CreateModalProps {
  show: boolean;
  handleClose: () => void;
}

interface CreateModalState {
  url: string;
  desciption: string;
}

function CreateModal(props: CreateModalProps) {
  const [state] = useState<CreateModalState>({
    url: "",
    desciption: ""
  });

  const [createPost] = useMutation(CREATEPOST, {
    onCompleted: () => {
      handleClose();
    },
    onError: (error: ApolloError) => {
      _error(error);
    }
    // refetchQueries: () => [{ query: POST_LIST }]
  });

  const { show, handleClose } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={values => {
          createPost({
            variables: {
              url: values.url,
              desciption: values.desciption
            }
          });
        }}
        initialValues={state}
        enableReinitialize={true}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="validationFormik01">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL"
                  name="url"
                  value={values.url}
                  onChange={handleChange}
                  isInvalid={touched.url && !!errors.url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik02">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  name="desciption"
                  value={values.desciption}
                  onChange={handleChange}
                  isInvalid={touched.desciption && !!errors.desciption}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.desciption}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
export default CreateModal;
