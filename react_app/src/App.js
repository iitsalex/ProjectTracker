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
      is_auth: false,
      teams: [],
      team_id: -1,
      projects: [],
      team_id: -1
    }
  }

  componentDidMount() {
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        this.setState({ is_auth: true });
      } else if (res.status === 401) {
        this.setState({ is_auth: false });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(console.error);

    fetch('/api/teams/currentuser').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.setState({
        teams: data,
        team_id: data[0].id
      });
    }).catch(console.error);
  }

  handleDataChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div className="App">
        <PivotNavbar data={this.state} handleDataChange={this.handleDataChange}/>
        <Routes data={this.state} />
        <p>team id: {this.state.team_id}</p>
        <p>project id: {this.state.project_id}</p>
        <p>Auth: {this.state.is_auth ? 'ok' : 'failed'}</p>
      </div>
    );
  }
}

export default App;
