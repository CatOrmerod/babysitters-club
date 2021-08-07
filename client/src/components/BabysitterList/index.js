import React from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      {showTitle && <h3>{title}</h3>}
      {babysitters &&
        babysitters.map((babysitter) => (
          <div key={babysitter._id} className="card mb-3">
            <h4 className="card-header p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/babysitters/${babysitter._id}`}
                >
                  {babysitter.babysitterAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    added herself for reviews on {babysitter.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You added yourself on {babysitter.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{babysitter.babysitterFirst}</p>
              <p>{babysitter.babysitterAbout}</p>
              <p>{babysitter.babysitterLoc}</p>
              <p>{babysitter.babysitterCert}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/babysitters/${babysitter._id}`}
            >
              See More
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BabysitterList;
