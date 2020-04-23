import React, {Component} from 'react';
import './App.css';

import MainNavbar from './MainNavbar';
import Routes from './Routes';

const Context = React.createContext();

class App extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/test')
      .then(res => res.text())
      .then(data => this.setState({message: data}))
      .catch(console.log)
  }

  render () {
    return (
      <div className="App">
        <MainNavbar/>
        <Routes />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
