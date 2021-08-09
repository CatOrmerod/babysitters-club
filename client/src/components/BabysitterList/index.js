import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, CardHeader, CardTitle, CardBody, CardText, CardImg, CardFooter } from 'reactstrap';
import './babysitter.css';

const BabysitterList = ({
  babysitters,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!babysitters.length) {
    return <h3>No Babysitters Added yet</h3>;
  }

  return (
    <Container>
      {showTitle && <h3>{title}</h3>}
      <Row xs="1" sm="1" md="2" lg="3">
          
            {babysitters &&
              babysitters.map((babysitter) => (
                <div key={babysitter._id}>
                  <Col>
                  {/* <CardDeck> */}
                  <Card className='card h-100'>
                  <CardHeader className="card-header p-2 m-0">
                    {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/babysitters/${babysitter._id}`}
                      >
                        {babysitter.babysitterAuthor} <br />
                        <span style={{ fontSize: '1rem' }}>
                          is available to babysit near {babysitter.babysitterLoc}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <span style={{ fontSize: '1rem' }}>
                          You added yourself on {babysitter.createdAt}
                        </span>
                      </>
                    )}
                  </CardHeader>
                  <CardBody className="card-body bg-light p-2">
                    <CardImg src={babysitter.babysitterPic} className="card-img" />
                    <CardText>About {babysitter.babysitterAuthor}: {babysitter.babysitterAbout}</CardText>
                    <CardText>Certifications Held: {babysitter.babysitterCert}</CardText>
                  </CardBody>
                  <CardFooter>
                    <Link
                      className="btn"
                      to={`/babysitters/${babysitter._id}`}
                    >
                      See More
                    </Link>
                  </CardFooter>
                  </Card>
                  {/* </CardDeck> */}
                  </Col>
                </div>
              ))}
      </Row>
    </Container>
  );
};

export default BabysitterList;
