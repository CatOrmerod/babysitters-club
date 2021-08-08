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
              <>
              <Col className="ml-auto" >
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>Find Babysitters in your area</h3>
                    <p>
                      Check out our babysitter profiles and see what other parents have to say.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3>Save your Favourites</h3>
                    <p>
                      Each time you find a babysitter you like, save them to your favourites so that you can easily find and contact them again. 
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-user-secret" />
                  </div>
                  <div className="description">
                    <h3>Want to do some babysitting yourself?</h3>
                    <p>
                      Add your own profile so that other parents can easily find your and contact you through the website.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" >
              <BabysitterList
                babysitters={babysitters}
                title="Babysitters in your area"
              />
              </Col>
              </>
            )}
          </div>
      </Row>
    </Container>
  );
};

export default Home;
