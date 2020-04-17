import MainNavbar from './Navbar';
//import Login from './Login';
import './App.css';
import React, {Component} from 'react';
import Dump from './Dump';
import Login from './containers/Login';

class App extends Component {
  // state = {
  //   users: []
  // }
  // componentDidMount() {
  //   fetch('localhost:3000/api/user/login?email=test@gmail.com&password=testpass')
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ users: data })
  //   })
  //   .catch(console.log)
  // }
  render () {
    return (
      // <Dump dump={this.state.user} />
      <div className="App">
        <MainNavbar/>
        <Login/>
      </div>
    );
  }
}

export default App;
