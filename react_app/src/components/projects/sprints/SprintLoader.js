import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import ReactLoading from 'react-loading';

import SprintList from "./SprintList";

class SprintLoader extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sprints: [],
      message: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.intervalID = setInterval(this.fetchSprints.bind(this), 5000);
    this.fetchSprints();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.project_id !== this.props.data.project_id) {
      this.fetchSprints();
    }
  }

  fetchSprints = () => {
    fetch('/api/sprints/project/' + this.props.data.project_id).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(data => {
      this.setState({
        loading: false,
        sprints: data,
        message: ''
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured fetching sprints'
      });
    });
  }

  render() {
    return (
      <div>
        { this.state.loading ?
          <FadeIn delay={500}>
            <ReactLoading className="centered" type={"bars"} color={"white"} height={'5%'} width={'5%'} />
          </FadeIn> :
          <SprintList
            user_id={this.props.data.user.id}
            project_id={this.props.data.project_id}
            sprints={this.state.sprints}
            setMessage={(val) => this.setState({message: val})}
            team_members={this.props.data.team_members}
            updateSprints={this.fetchSprints}
            updateTasks={this.props.updateTasks}
            message={this.state.message}
          />
        }
        <p>{this.state.message}&nbsp;</p>
      </div>
    );
  }
}

export default SprintLoader;
