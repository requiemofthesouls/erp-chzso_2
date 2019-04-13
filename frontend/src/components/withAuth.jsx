import React, { Component } from 'react';
import AuthService from './AuthService';
import { Redirect} from 'react-router-dom';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        Auth.props.history.push('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user}/>
        );
      } else {
        return <AuthComponent/>;
      }
    }
  };


}