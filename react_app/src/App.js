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
      tasks: [],
      all_tasks: [],
      message: ''
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.intervalID = setInterval(this.updateAuth.bind(this), 5000);
    this.updateAuth();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
  }

  handleDataChange = (event) => {
    const { value, name } = event.target;
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
            loading: false
          });
        }
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      if (data && this._isMounted) {
        this.setState({
          is_auth: true,
          user: data
        }, () => this.updateTeams());
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
          this.setState({
            team_id: data[0].id
          }, () => this.updateTeamMembers());
        } else {
          this.setState({ loading: false })
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
          this.setState({
            project_id: data[0].id
          }, () => this.updateTasks());
        } else {
          this.setState({ loading: false })
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
      this.distributeTasks(data);
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching tasks'
      });
    });
  }

  distributeTasks = (data) => {
    let taskDist = [
      {name: 'New', container: []},
      {name: 'In Progress', container: []},
      {name: 'Done', container: []}
    ]
    data.forEach((task) => {
      switch (task.status) {
        case 'New':
          taskDist[0].container.push(task);
          break;
        case 'In Progress':
          taskDist[1].container.push(task);
          break;
        case 'Done':
          taskDist[2].container.push(task);
          break;
        default:
          const error = new Error('Unknown task status: ' + task.status);
          throw error;
      }
    });
    if (this._isMounted) {
      this.setState({
        all_tasks: data.reverse(),
        tasks: taskDist,
        loading: false,
        message: ''
      });
    }
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
              logout={() => this.setState({teams: [], projects: [], tasks: []})}
            />
          </Fragment>
        }
        <p>{this.state.message}&nbsp;</p>
      </div>

    );
  }
}

export default App;
