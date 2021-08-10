import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, CardTitle, CardBody, CardImg, Card } from 'reactstrap';
import { saveBabysitterIds, getSavedBabysitterIds } from '../utils/localStorage';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import RatingList from '../components/RatingList';
import RatingForm from '../components/RatingForm';
import SMSForm from '../components/SMSForm';
import { SAVE_BABYSITTER } from '../utils/mutations'
import Auth from '../utils/auth';
import { QUERY_SINGLE_BABYSITTER } from '../utils/queries';

const SingleBabysitter = () => {
  const [saveBabysitter, { error }] = useMutation(SAVE_BABYSITTER);

  // create state to hold saved bookId values
  const [savedBabysitterIds, setSavedBabysitterIds] = useState(getSavedBabysitterIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBabysitterIds(savedBabysitterIds);
  });
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { babysitterId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BABYSITTER, {
    // pass URL parameter
    variables: { babysitterId: babysitterId },
  });
  const babysitter = data?.babysitter || {};

  // create function to handle saving a book to our database
  const handleSaveBabysitter = async () => {
    // find the book in `searchedBooks` state by the matching id
    const babysitterId = data.babysitter._id
    console.log(babysitterId)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await saveBabysitter(bookToSave, token);
      // use SAVE_BOOK mutation
      console.log('testing line 52');
      const datab = await saveBabysitter({
        variables: { babysitterId }
      });
console.log(datab);
      if (error) {
        throw new Error('something went wrong!');
      }
      // if book successfully saves to user's account, save book id to state
      setSavedBabysitterIds([...savedBabysitterIds, babysitterId]);
      window.location.reload()
    } catch (err) {
      
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    <Container>
      <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
        <CardImg top width="90%" src={babysitter.babysitterPic} alt="" className='img' style={{ width: '90%', maxWidth: '250px', textAlign: 'center' }} />
        <CardTitle tag="h3" >
          {babysitter.babysitterAuthor} <br />
        </CardTitle>
        <CardBody >
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              lineHeight: '1.5',
            }}
          >
            {babysitter.babysitterAbout}
          </blockquote>
        </CardBody>
        {Auth.loggedIn() && (
          <Button
            disabled={savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)}
            className='btn-block btn-info'
            onClick={() => handleSaveBabysitter(babysitter.babysitterId)}>
            {savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)
              ? 'This babysitter has already been saved!'
              : 'Save this Babysitter!'}
          </Button>
        )}
        <SMSForm 
        babysitterPh={babysitter.babysitterPh}
        babysitterAuthor={babysitter.babysitterAuthor}
         />
        <div className="my-5">
          <RatingList ratings={babysitter.ratings} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
          <RatingForm babysitterId={babysitter._id} />
        </div>
      </Card>
    </Container>
  );
};

export default SingleBabysitter;
