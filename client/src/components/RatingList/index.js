import React from 'react';

const RatingList = ({ ratings = [] }) => {
  if (!ratings.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Reviews
      </h3>
      <div className="flex-row my-4">
        {ratings &&
          ratings.map((rating) => (
            <div key={rating._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {rating.ratingAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {rating.createdAt}
                  </span>
                </h5>
                <p className="card-body">{rating.ratingText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RatingList;
