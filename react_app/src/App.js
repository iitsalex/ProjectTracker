import MainNavbar from './Navbar';
import Login from './Login';
import './App.css';
import React, {Component} from 'react';
import Dump from './Dump';

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
      <Dump dump={this.state.user} />
      <div className="App">
        <MainNavbar/>
        <Login/>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
