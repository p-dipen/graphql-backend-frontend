import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from "../constants";
import * as yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router";

const SIGNUPMUTATION = gql`
  mutation SignUpMuatation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGINMUTATION = gql`
  mutation LogInMuatation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const schema = yup.object({
  login: yup.boolean(),
  name: yup.string().when("login", (login: boolean, nameSchema: any) => {
    return login ? nameSchema : nameSchema.required();
  }),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

interface LoginState {
  login: boolean;
  email: string;
  password: string;
  name: string;
}

class Login extends React.Component<RouteComponentProps<{}>, LoginState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      login: true,
      email: "",
      password: "",
      name: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem(AUTH_TOKEN)) {
      this.props.history.push(`/home`);
    }
  }

  _changeloginstatus = () => {
    this.setState(() => ({
      login: !this.state.login,
      email: "",
      password: "",
      name: ""
    }));
  };

  _confirm = async (data: any) => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    let msg = this.state.login
      ? "Login Successfully"
      : "User Created Successfully";
    toast.success(msg);
    this.props.history.push(`/home`);
  };

  _error = async (error: any) => {
    toast.error(error.message);
  };

  _saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    return (
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Mutation
            mutation={this.state.login ? LOGINMUTATION : SIGNUPMUTATION}
            onCompleted={this._confirm}
            onError={this._error}
          >
            {(mutation: any) => (
              <Formik
                validationSchema={schema}
                onSubmit={values => {
                  mutation({
                    variables: {
                      email: values.email,
                      password: values.password,
                      name: values.name
                    }
                  });
                }}
                initialValues={this.state}
                enableReinitialize={true}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <h3 className="text-center">
                      {this.state.login ? "Sign In" : "Sign Up"}
                    </h3>
                    {!this.state.login && (
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                    <Form.Group controlId="validationFormik02">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationFormik03">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                      <Button variant="primary" type="submit">
                        {this.state.login ? "Sign In" : "Sign Up"}
                      </Button>
                    </Form.Group>
                    <div
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={this._changeloginstatus}
                    >
                      {this.state.login
                        ? "nead to create an account"
                        : "already have an account?"}
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
