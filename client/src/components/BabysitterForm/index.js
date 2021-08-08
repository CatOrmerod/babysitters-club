import React, { useState } from 'react';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
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
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <Form className='babysitter-form' onSubmit={handleFormSubmit}>
                <Row>
                  <Col md="3" sm="4">
                    <div className="profile-picture">
                      <h4 className="title">
                        <small>Profile Pic</small>
                      </h4>
                      <ImageUpload avatar
                        setFormState={setFormState}
                        name="babysitterPic" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" sm="6">
                    <AvForm>
                      <label htmlFor='form-ph'>Phone Number:</label>
                      <AvField
                        name="babysitterPh"
                        placeholder="Enter your phone number (it won't be displayed)"
                        validate={{ tel: true }}
                        onChange={handleChange}
                      />
                    </AvForm>
                  </Col>
                  <Col md="6" sm="6">
                    <FormGroup>
                      <label htmlFor='form-location'>Location</label>
                      <Location
                        handleChange={handleChange}
                        formState={formState}
                        setFormState={setFormState} />
                    </FormGroup>
                  </Col>
                </Row>
                <AvForm>
                  <label htmlFor='form-cert'>Certificates</label>
                  <AvCheckboxGroup inline
                    name="babysitterCert"
                    label="Select any Certifications held"
                    onChange={handleChange}>
                    <AvCheckbox label="WWCC" value="WWCC" />
                    <AvCheckbox label="First Aid" value="First Aid" />
                    <AvCheckbox label="Police Check" value="Police Check" />
                    <AvCheckbox label="Pikachu" value="Pikachu" />
                  </AvCheckboxGroup>
                </AvForm>
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
