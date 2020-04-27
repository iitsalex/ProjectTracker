import React, {Component} from 'react';
import './App.css';

import PivotNavbar from './components/PivotNavbar';
import Routes from './Routes';

// const Context = React.createContext();

class App extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: '',
      teams: [],
      team_id: -1,
      projects: [],
      team_id: -1
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

    fetch('/api/teams/currentuser').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.setState({ teams: data });
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render () {
    return (
      <div className="App">
        <PivotNavbar />
        <Routes data={this.state}/>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
