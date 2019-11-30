import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { POST_LIST } from "./LinkList";
import { _error, _success } from "../utili";
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
class CreateModal extends Component {
  state = {
    url: "",
    desciption: ""
  };
  render() {
    const { show } = this.props;
    return (
      <Modal show={show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Mutation
          mutation={CREATEPOST}
          onCompleted={() => {
            this.props.handleClose();
            _success("Added successfulyy");
          }}
          onError={_error}
          refetchQueries={() => [{ query: POST_LIST }]}
        >
          {mutation => (
            <>
              <Formik
                validationSchema={schema}
                onSubmit={values => {
                  mutation({
                    variables: {
                      url: values.url,
                      desciption: values.desciption
                    }
                  });
                }}
                initialValues={this.state}
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
                      <Button
                        variant="secondary"
                        onClick={this.props.handleClose}
                      >
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Mutation>
      </Modal>
    );
  }
}
export default CreateModal;
