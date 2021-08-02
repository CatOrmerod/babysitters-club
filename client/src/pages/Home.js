import React from 'react';
import { useQuery } from '@apollo/client';

import BabysitterList from '../components/BabysitterList';
import BabysitterForm from '../components/BabysitterForm';

import { QUERY_BABYSITTERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BABYSITTERS);
  const babysitters = data?.babysitters || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <BabysitterForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BabysitterList
              babysitters={babysitters}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
