import React, {Component} from 'react';
import './App.css';

import MainNavbar from './MainNavbar';
import Routes from './Routes';

const Context = React.createContext();

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
        <Routes />
      </div>
    );
  }
}

export default App;
