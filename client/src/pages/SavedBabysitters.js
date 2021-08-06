import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_SAVED_BABYSITTER } from '../utils/mutations'
import { QUERY_ME } from '../utils/queries'

const SavedBabysitters = () => {
  const [removeSavedBabysitter, { error }] = useMutation(REMOVE_SAVED_BABYSITTER);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || data?.user || {};
  console.log(userData)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBabysitter = async (babysitterId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      
      await removeSavedBabysitter({
        variables: { babysitterId }
      });

      if (error) {
        throw new Error('something went wrong!');
      }

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved babysitters!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBabysitters?.length
            ? `Viewing ${userData.savedBabysitters.length} saved ${userData.savedBabysitters.length === 1 ? 'babysitter' : 'babysitters'}:`
            : 'You have no saved babysitters!'}
        </h2>
        <CardColumns>
          {userData.savedBabysitters.map((babysitter) => {
            return (
              <Card key={babysitter.babysitterId} border='dark'>
                {babysitter.babysitterPic ? <Card.Img src={babysitter.babysitterPic} alt={`The cover for ${babysitter.babysitterAuthor }`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>
                    
                      {babysitter.babysitterFirst}
                    
                  </Card.Title>
                  <p className='small'>Name: {babysitter.babysitterFirst}</p>
                  <Card.Text>{babysitter.babysitterAbout}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBabysitter(babysitter.babysitterId)}>
                    Delete this Babysitter!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBabysitters;