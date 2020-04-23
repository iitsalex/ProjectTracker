import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
class Home extends Component {
  render() {
    return (
      <div>
      <img src={ require('../assets/images/Pivot_logo.png') } alt="Pivot Logo" />
      <h1>Your Project Tracking Solution</h1>
      <br/>
      <Button bsSize="large" type="submit">
        <Link to="/signup" style={{ color: '#FFF' }}>Sign Up</Link>
      </Button>
      </div>
    );
  }
}

export default Home
