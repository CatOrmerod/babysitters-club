import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

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

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <>
          <Container>
            <Row>
            <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>Find Babysitters in your area</h3>
                    <p>
                      Check out our babysitter profiles and see what other parents have to say.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3>Save your Favourites</h3>
                    <p>
                      Each time you find a babysitter you like, save them to your favourites so that you can easily find and contact them again. 
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-user-secret" />
                  </div>
                  <div className="description">
                    <h3>Want to do some babysitting yourself?</h3>
                    <p>
                      Add your own profile so that other parents can easily find your and contact you through the website.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Login</CardTitle>
                  <Form onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <Input
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                    <label htmlFor="pwd">Password</label>
                    <Input
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                    {error ? (
                      <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                      </div>
                    ) : null}
                    <Button block type="submit" className="btn-round" color="default">
                      Submit
                    </Button>
                  </Form>
                  <div className="signup">
                      <Link to="/signup">Need to set up an account?{" "}</Link>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
    </>
  );
}

export default Login;
