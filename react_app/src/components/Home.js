import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';

class Home extends Component {
  render() {
    return (
      <header>
        <FadeIn delay='200'>
          <img src={ require('../assets/images/Pivot_logo.png') } alt="Pivot Logo" />
          <h1>Your Project Tracking Solution</h1>
          <br/>
          {this.props.is_auth ?
            <p>Welcome {this.props.user.fname + ' ' + this.props.user.lname}</p> :
            <Button variant='info' href="/signup"type="submit">Sign Up</Button>
          }
        </FadeIn>
      </header>
    );
  }
}

export default Home;
