import React, { Component, Fragment } from 'react';
import FadeIn from 'react-fade-in';
import ReactLoading from 'react-loading';
import './App.css';

import PivotNavbar from './components/PivotNavbar';
import Routes from './Routes';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      is_auth: false,
      user: null,
      teams: [],
      team_members: [],
      team_id: -1,
      projects: [],
      project_id: -1,
      backlog_tasks: [],
      active_tasks: [],
      message: ''
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.intervalID = setInterval(this.updateAuth.bind(this), 60000);
    this.updateAuth();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
  }

  handleDataChange = (event) => {
    let { value, name } = event.target;
    if (name === 'team_id' || name === 'project_id') {
      value = parseInt(value);
    }
    this.setState({ [name]: value }, () => {
      if (name === 'team_id') {
        this.updateTeamMembers();
      } else if (name === 'project_id') {
        this.updateTasks();
      }
    });
  }

  updateAuth = () => {
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        if (this._isMounted) {
          return res.json();
        }
      } else if (res.status === 401) {
        if (this._isMounted) {
          this.setState({
            is_auth: false,
            loading: false,
            projects: [],
            backlog_tasks: [],
            active_tasks: []
          }, () => {
            clearInterval(this.intervalID);
          });
        }
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (data && this._isMounted) {
        if (this.state.is_auth) {
          this.setState({
            user: data
          }, () => this.updateTeams());
        } else {
          this.setState({
            is_auth: true,
            user: data
          }, () => {
            clearInterval(this.intervalID);
            this.intervalID = setInterval(this.updateAuth.bind(this), 5000);
            this.updateTeams();
          });
        }
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured with authentication'
      });
    });
  }

  updateTeams = () => {
    fetch('/api/teams/currentuser').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({
          teams: data,
          message: ''
        });
        if (data[0] !== undefined) {
          if (data.map((team) => team.id).includes(this.state.team_id)) {
            this.updateTeamMembers();
          } else {
            this.setState({
              team_id:  data[0].id
            }, () => this.updateTeamMembers());
          }
        } else {
          this.setState({
            loading: false,
            projects: [],
            backlog_tasks: [],
            active_tasks: []
          })
        }
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching teams'
      });
    });
  }

  updateTeamMembers = () => {
    fetch('/api/user/team/' + this.state.team_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({
          team_members: data,
          message: ''
        }, () => this.updateProjects());
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching team members'
      });
    });
  }

  updateProjects = () => {
    fetch('/api/projects/team/' + this.state.team_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({
          projects: data,
          message: ''
        });
        if (data[0] !== undefined) {
          if (data.map((project) => project.id).includes(this.state.project_id)) {
            this.updateTasks();
          } else {
            this.setState({
              project_id: data[0].id
            }, () => this.updateTasks());
          }
        } else {
          this.setState({
            loading: false,
            backlog_tasks: [],
            active_tasks: []
          })
        }
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching projects'
      });
    });
  }

  updateTasks = (p_id) => {
    fetch('/api/tasks/project/' + this.state.project_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (this._isMounted) {
        this.setState({
          backlog_tasks: data.backlog,
          active_tasks: data.active,
          loading: false,
          message: ''
        });
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching tasks'
      });
    });
  }

  render () {
    return (
      <div className="App">
        { this.state.loading ?
          <FadeIn delay={500}>
            <header className="App-header" style={{backgroundColor: 'transparent'}}>
              <ReactLoading type={"bars"} color={"white"} height={'5%'} width={'5%'} />
            </header>
          </FadeIn> :
          <Fragment>
            <PivotNavbar
              data={this.state}
              handleDataChange={this.handleDataChange}
              updateProjects={this.updateProjects}
              updateAuth={this.updateAuth}
            />
            <Routes
              data={this.state}
              updateTeams={this.updateTeams}
              updateProjects={this.updateProjects}
              updateTeamMembers={this.updateTeamMembers}
              updateTasks={this.updateTasks}
              updateAuth={this.updateAuth}
            />
          </Fragment>
        }
        <p>{this.state.message}&nbsp;</p>
      </div>
    );
  }
}

export default App;
