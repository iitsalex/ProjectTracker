import React, {Component} from 'react'

class Dump extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''
      }
  }

  render() {
    return (
      <div>
        <h3>React Dump Component</h3>
      </div>
    );
  }
}

export default Dump
