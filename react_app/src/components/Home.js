import React, {Component} from 'react'
import { Button } from "react-bootstrap"

class Home extends Component {
  render() {
    return (
      <div>
      <img src={ require('../assets/images/Pivot_logo.png') } alt="Pivot Logo" />
      <h1>Your Project Tracking Solution</h1>
      <br/>
      <Button href="/signup"type="submit">Sign Up</Button>
      </div>
    );
  }
}

export default Home;
