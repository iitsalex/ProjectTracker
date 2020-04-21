import React, {Component} from 'react';
import './App.css';

import MainNavbar from './MainNavbar';
import Dump from './Dump';
import Login from './containers/Login'
import SignUp from './containers/SignUp'

class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/user')
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data })
    })
    .catch(console.log)
  }
  render () {
    return (
      <div className="App">
        <MainNavbar/>
        <Login/>
      </div>
    );
  }
}

export default App;
