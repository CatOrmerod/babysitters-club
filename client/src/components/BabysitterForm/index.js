import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BABYSITTER } from '../../utils/mutations';
import { QUERY_BABYSITTERS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ImageUpload from '../ImageUpload';

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
      <h3>Details of your profile</h3>

      {Auth.loggedIn() ? (

        <Form className='menu-item-form' onSubmit={handleFormSubmit}>
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
              <label htmlFor='form-loc'>Postcode</label>
              <input
                name="babysitterLoc"
                placeholder="Enter your postcode"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
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

            <Button type='submit'>Save</Button>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </Form>
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
