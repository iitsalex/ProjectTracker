import React, {Component} from 'react'
var Pivot_logo = require('./assets/images/Pivot_logo.png');

class Home extends Component {


  render() {
    return (
      <div>
      <img src={ require('./assets/images/Pivot_logo.png') } />

      <h1>Your Project Tracking Solution</h1>
      </div>
    );
  }
}

export default Home
