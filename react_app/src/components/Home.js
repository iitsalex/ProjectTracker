import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import FadeIn from 'react-fade-in';

class Home extends Component {
  render() {
    return (
      <header>
        <FadeIn delay='200'>
          <h1 style={{color: '#3498DB', fontSize: '100px', marginTop: '2rem'}}>
            Pivot <span className='slight-muted' style={{color: '#FFF'}}>Beta</span>
          </h1>
          <h3>Project Tracking</h3>
          <h4 className='slight-muted'>Made Easy</h4>
          <br/>
          {this.props.is_auth ?
            <p>Welcome {this.props.user.fname + ' ' + this.props.user.lname}</p> :
            <Button variant='secondary' href="/signup" type="submit" style={{minWidth: '20em'}}>Sign Up</Button>
          }
        </FadeIn>
      </header>
    );
  }
}

export default Home;
