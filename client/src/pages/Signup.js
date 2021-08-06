import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("register-page");
      document.body.classList.remove("full-screen");
    };
  });
  return (
    <>
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" +
              require("/Users/catormerod/OneDrive/Coding Bootcamp/projects/babysitter/client/src/assets/images/beach-mother-child-silhouette.jpg").default +
              ")",
          }}
        >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
              <Card className="card-register">
                <CardTitle tag="h3">Sign Up for an Account</CardTitle>
                <Form onSubmit={handleFormSubmit}>
                  <label htmlFor="firstName">First Name:</label>
                  <Input
                    placeholder="First"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange}
                  />
                  <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <Input
                      placeholder="Last"
                      name="lastName"
                      type="lastName"
                      id="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <Input
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="pwd">Password:</label>
                    <Input
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row flex-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    </>
  );
}

export default Signup;
