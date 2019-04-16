import React from 'react';
import LoginForm from '../components/AuthService/Login';
import { connect } from 'react-redux';
import { setUsernameText } from '../store/registration/actions';


class LoginFormContainer extends React.Component {
  render() {
    return (
      <LoginForm
        username={this.props.username}
        setUsernameText={this.props.setUsernameText}
        history={this.props.history}
      />);
  }

}

const mapStateToProps = (state) => {
  return {
    username: state.registration.username,
  };

};

const mapDispatchToProps = {
  setUsernameText,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);

