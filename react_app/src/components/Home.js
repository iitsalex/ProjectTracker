import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';

class Home extends Component {
  render() {
    return (
      <FadeIn delay='200'>
        <img src={ require('../assets/images/Pivot_logo.png') } alt="Pivot Logo" />
        <h1>Your Project Tracking Solution</h1>
        <br/>
        <p>Welcome {this.props.user.fname + ' ' + this.props.user.lname}</p>
        <br/>
        {this.props.is_auth ? '' : <Button href="/signup"type="submit">Sign Up</Button>}
      </FadeIn>
    );
  }
}

export default Home;
