import React from 'react';
import SignupForm from '../components/AuthService/Signup';
import { connect } from 'react-redux';
import { setUsernameText } from '../store/registration/actions';


class RegistrationFormContainer extends React.Component {
  render() {
    return (
      <SignupForm
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer);

