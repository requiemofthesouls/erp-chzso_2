import React, { Component } from 'react';
import AuthServiceLogic from './AuthServiceLogic';
import { Redirect} from 'react-router-dom';

export default function authServiceWrapper(AuthComponent) {
  const Auth = new AuthServiceLogic();

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
