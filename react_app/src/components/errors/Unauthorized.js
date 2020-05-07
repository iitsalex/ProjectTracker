import React from 'react';
import FadeIn from 'react-fade-in';

class Unauthorized extends React.Component {
  render () {
    return (
      <FadeIn>
        <div className="page-container">
          <div className="bg"></div>
          <h1 className="title slight-muted pad-em">401</h1>
          <h2 className="text-muted pad-em-bottom">Unauthorized</h2>
          <p className="text-muted">Please log in to view this page</p>
        </div>
      </FadeIn>
    );
  }
}

export default Unauthorized;
