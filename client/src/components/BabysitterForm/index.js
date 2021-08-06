import React, { useState } from 'react';
// import { Button, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BABYSITTER } from '../../utils/mutations';
import { QUERY_BABYSITTERS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ImageUpload from '../ImageUpload';
import Location from '../Location';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

const BabysitterForm = () => {
  const [formState, setFormState] = useState({
    babysitterAbout: '',
    babysitterLoc: '',
    babysitterCert: '',
    babysitterPic: '',
    babysitterPh: '',
  });

  const [addBabysitter, { error }] = useMutation(ADD_BABYSITTER, {
    update(cache, { data: { addBabysitter } }) {
      try {
        const { babysitters } = cache.readQuery({ query: QUERY_BABYSITTERS });

        cache.writeQuery({
          query: QUERY_BABYSITTERS,
          data: { babysitters: [addBabysitter, ...babysitters] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, babysitters: [...me.babysitters, addBabysitter] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBabysitter({
        variables: {
          babysitterAbout: formState.babysitterAbout,
          babysitterLoc: formState.babysitterLoc,
          babysitterCert: formState.babysitterCert,
          babysitterPic: formState.babysitterPic,
          babysitterPh: formState.babysitterPh,
          babysitterAuthor: Auth.getProfile().data.firstName,
          babysitterFirst: Auth.getProfile().data.firstName,
          babysitterLast: Auth.getProfile().data.lastName,
          babysitterEmail: Auth.getProfile().data.email,
        },
      });
    } catch (e) {
      console.error(e);
    }
    //clear fields after add babysitter
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
console.log(formState)
  return (
    <>
      <h3>Details of your profile</h3>

      {Auth.loggedIn() ? (
        <Container>
          {/* <Row>
            <div className="profile-picture">
              <div
                className="fileinput fileinput-new"
                data-provides="fileinput"
              >
                <div className="fileinput-new img-no-padding">
                  <img
                    alt="..."
                    src={
                      require("/Users/catormerod/OneDrive/Coding Bootcamp/projects/babysitter/client/src/assets/images/beach-fun.jpeg").default
                    }
                  />
                </div>
                <div className="fileinput-preview fileinput-exists img-no-padding" />
                <div>
                  <Button
                    className="btn-file btn-round"
                    color="default"
                    outline
                  >
                    <span className="fileinput-new">Change Photo</span>
                    <span className="fileinput-exists">Change</span>
                    <input name="..." type="file" />
                  </Button>
                  <br />
                  <Button
                    className="btn-link fileinput-exists"
                    color="danger"
                    data-dismiss="fileinput"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-times" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Row> */}
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <Form className='babysitter-form' onSubmit={handleFormSubmit}>
                <Row>
                  <Col md="3" sm="4">
                  <div className="profile-picture">
                    <h4 className="title">
                    <small>Avatar</small>
                    </h4>
                    <ImageUpload avatar 
                    setFormState={setFormState}/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" sm="6">
                    <FormGroup>
                      <label htmlFor='form-ph'>Phone Number:</label>
                      <Input
                      name="babysitterPh"
                      placeholder="Enter your phone number (it won't be displayed)"
                      onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="6">
                    <FormGroup>
                    <label htmlFor='form-cert'>Certificates</label>
                <Input
                  name="babysitterCert"
                  placeholder="What certifications do you have?"
                  onChange={handleChange}
                />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor='form-location'>Location</label>
                  <Location
                    handleChange={handleChange}
                    formState={formState}
                    setFormState={setFormState} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='form-about'>About</label>
                  <Input
                    name="babysitterAbout"
                    placeholder="Tell us all about yourself."
                    className="textarea"
                    type="textarea"
                    maxLength="1256"
                    rows="3"
                    onChange={handleChange}
                  />
                  <h5>
                    <small>
                      <span
                        className="pull-right"
                        id="textarea-limited-message"
                      >
                        150 characters left
                      </span>
                    </small>
                  </h5>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="btn-wd btn-round"
                    color="info"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          {/* <Form className='babysitter-form' onSubmit={handleFormSubmit}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label htmlFor='form-about'>About</label>
                <input
                  name="babysitterAbout"
                  placeholder="Tell us all about yourself"
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='form-location'>Location</label>

                <Location
                  handleChange={handleChange}
                  formState={formState}
                  setFormState={setFormState} />
              </Form.Field>
              <Form.Field>
                <label htmlFor='form-cert'>Certificates</label>
                <input
                  name="babysitterCert"
                  placeholder="What certifications do you have?"
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='form-image-upload'>Image</label>
                <ImageUpload />
              </Form.Field>
              <Form.Field>
                <label htmlFor='form-ph'>Phone Number:</label>
                <input
                  name="babysitterPh"
                  placeholder="Enter your phone number (it won't be displayed)"
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>

            <Button type='submit'>Save</Button> */}

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
        </Container>
      ) : (
        <p>
          You need to be logged in to add yourself to our database. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>

  );
};
export default BabysitterForm;
