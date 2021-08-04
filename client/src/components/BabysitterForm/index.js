import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BABYSITTER } from '../../utils/mutations';
import { QUERY_BABYSITTERS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

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
    <div>
      <h3>Details of your profile</h3>

      {Auth.loggedIn() ? (
        <>
          
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="babysitterAbout"
                placeholder="Tell us all about yourself"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="babysitterLoc"
                placeholder="Enter your postcode"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="babysitterCert"
                placeholder="What certifications do you have?"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="babysitterPic"
                placeholder="Add a link for a pic of yourself"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="babysitterPh"
                placeholder="Enter your phone number (it won't be displayed)"
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Babysitter
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add yourself to our database. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BabysitterForm;
