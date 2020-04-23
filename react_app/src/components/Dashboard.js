import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
class Dashboard extends Component {
  render() {
    return (
      <div>
      <img src={ require('../assets/images/Pivot_logo.png') } />
      <h1>Your Project Tracking Solution</h1>
      <br/>
      <Button bsSize="large" type="submit">
        <Link to="/signup" style={{ color: '#FFF' }}>Sign Up</Link>
      </Button>
      </div>
    );
  }
}

export default Dashboard
