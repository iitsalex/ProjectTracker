import React, {Component} from 'react';
import './App.css';

import PivotNavbar from './components/PivotNavbar';
import Routes from './Routes';

// const Context = React.createContext();

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      is_auth: false,
      teams: [],
      team_id: -1,
      projects: [],
      project_id: -1,
      tasks: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/user/auth').then(res => {
      if (res.status === 200) {
        if (this._isMounted) {
          this.setState({ is_auth: true }, () =>
            this.updateTeams()
          );
        }
      } else if (res.status === 401) {
        if (this._isMounted) {
          this.setState({ is_auth: false, loading: false });
        }
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(console.error);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleDataChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      if (name === 'team_id') {
        this.updateProjects();
      } else if (name === 'project_id') {
        this.updateTasks();
      }
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
          projects: [],
          tasks: []
        });
        if (data[0] !== undefined) {
          this.setState({
            team_id: data[0].id
          }, () => this.updateProjects());
        } else {
          this.setState({ loading: false })
        }
      }
    }).catch(console.error);
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
          tasks: []
        });
        if (data[0] !== undefined) {
          this.setState({
            project_id: data[0].id
          }, () => this.updateTasks());
        } else {
          this.setState({ loading: false })
        }
      }
    }).catch(console.error);
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
    }).catch(console.error);
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
        tasks: taskDist,
        loading: false
      });
    }
  }

  render () {
    return (
      <div className="App">
        <PivotNavbar
          data={this.state}
          handleDataChange={this.handleDataChange}
          updateProjects={this.updateProjects}
        />
        { this.state.loading ? 'loading...' :
          <Routes
            data={this.state}
            updateTeams={this.updateTeams}
            updateProjects={this.updateProjects}
            updateTasks={this.updateTasks}
            logout={() => this.setState({teams: [], projects: [], tasks: []})}
          />
        }


      </div>
    );
  }
}

export default App;
