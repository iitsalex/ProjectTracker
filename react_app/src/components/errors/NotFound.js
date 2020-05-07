import React from 'react';
import FadeIn from 'react-fade-in';

class NotFound extends React.Component {
  render () {
    return (
      <FadeIn>
        <div className="page-container">
          <div className="bg"></div>
          <h1 className="title slight-muted pad-em">404</h1>
          <h2 className="text-muted pad-em-bottom">Page Not Found</h2>
          <p className="text-muted">Please check your URL and try again</p>
        </div>
      </FadeIn>
    );
  }
}

export default NotFound;
