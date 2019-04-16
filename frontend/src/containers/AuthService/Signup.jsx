import React from 'react';
import SignupForm from '../../components/AuthService/Signup';
import { connect } from 'react-redux';
import { setGlobalUsername } from '../../store/auth/actions';


class RegistrationFormContainer extends React.Component {
  render() {
    return (
      <SignupForm
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer);

