import React, {Component} from 'react';
import './App.css';

import PivotNavbar from './PivotNavbar';
import Routes from './Routes';

// const Context = React.createContext();

class App extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        return('Auth ok');
      } else if (res.status === 401) {
        return('Auth failed');
      }
    }).then(data => this.setState(
      { message: data })
    ).catch(console.error);
  }

  render () {
    return (
      <div className="App">
        <PivotNavbar/>
        <Routes />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
