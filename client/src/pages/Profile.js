import React from 'react';
import { Row } from 'reactstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import BabysitterForm from '../components/BabysitterForm';
import BabysitterList from '../components/BabysitterList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { email: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Redirect to="/me" />;
  }
  console.log(user.babysitters)
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <Row>
        <h2 className="col-12 col-md-10 p-3 mb-5">
          Viewing {userParam ? `${user.email}'s` : 'your'} profile.
        </h2>
        </Row>
        <Row>
          <BabysitterList
            babysitters={user.babysitters}
            title={`${user.email}'s babysitter profile`}
            showTitle={false}
            showUsername={false}
          />
        {!userParam && (
            <BabysitterForm 
            babysitters={user.babysitters}
            />
        )}
        </Row>
    </div>
  );
};

export default Profile;
