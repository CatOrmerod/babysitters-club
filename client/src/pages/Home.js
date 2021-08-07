import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/client';

import BabysitterList from '../components/BabysitterList';
import BabysitterForm from '../components/BabysitterForm';

import { QUERY_BABYSITTERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BABYSITTERS);
  const babysitters = data?.babysitters || [];

  return (
    <Container>
      <Row>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <BabysitterList
                babysitters={babysitters}
                title="Babysitters in your area"
              />
            )}
          </div>
      </Row>
    </Container>
  );
};

export default Home;
