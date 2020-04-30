import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';

class Home extends Component {
  render() {
    return (
      <header>
        <FadeIn delay='200'>
          <h1 style={{color: '#3498DB', fontSize: '100px', margin: '2rem'}}>Pivot</h1>
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
