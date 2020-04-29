import React from 'react';
import { Toast } from 'react-bootstrap';

class ToastTemplate extends React.Component {
  render () {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px',
        }}
      >
        <Toast
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          delay={3000}
          show={this.props.show}
          autohide
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Pivot</strong>
          </Toast.Header>
          <Toast.Body>{this.props.body}</Toast.Body>
        </Toast>
      </div>

    )
  }
}

export default ToastTemplate;
