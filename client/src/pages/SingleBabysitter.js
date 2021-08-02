import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RatingList from '../components/RatingList';
import RatingForm from '../components/RatingForm';

import { QUERY_SINGLE_BABYSITTER } from '../utils/queries';

const SingleBabysitter = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { babysitterId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BABYSITTER, {
    // pass URL parameter
    variables: { babysitterId: babysitterId },
  });

  const babysitter = data?.babysitter || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {babysitter.babysitterAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {babysitter.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {babysitter.babysitterText}
        </blockquote>
      </div>

      <div className="my-5">
        <RatingList ratings={babysitter.ratings} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <RatingForm babysitterId={babysitter._id} />
      </div>
    </div>
  );
};

export default SingleBabysitter;
