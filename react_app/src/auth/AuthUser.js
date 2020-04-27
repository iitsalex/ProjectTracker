import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function AuthUser(ComponentToProtect, passedProps) {

  return class extends Component {
    _isMounted = false;
    
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        data: passedProps
      };
    }

    componentDidMount() {
      this._isMounted = true;
      fetch('/api/user/auth').then(res => {
        if (res.status === 200) {
          if (this._isMounted) {
            this.setState({ loading: false });
          }
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        if (this._isMounted) {
          this.setState({ loading: false, redirect: true });
        }
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/401" />;
      }
      return <ComponentToProtect data={this.state.data} {...this.props} />;
    }
  }
}

export default AuthUser;
