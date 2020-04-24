import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function AuthUser(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('/api/user/auth').then(res => {
        if (res.status === 401) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/403" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}

export default AuthUser;