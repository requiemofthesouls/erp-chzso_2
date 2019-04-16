import React from 'react';
import LoginForm from '../../components/AuthService/Login';
import { connect } from 'react-redux';
import { setGlobalUsername } from '../../store/auth/actions';


class LoginFormContainer extends React.Component {
  render() {
    return (
      <LoginForm
        username={this.props.username}
        setGlobalUsername={this.props.setGlobalUsername}
        history={this.props.history}
      />);
  }

}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };

};

const mapDispatchToProps = {
  setGlobalUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);

