import { connect } from 'react-redux';
import React from 'react';
import App from '../components/App';
import { setUsernameText } from '../store/registration/actions';


class MyAppContainer extends React.Component {
  render() {
    return (
      <App
        username={this.props.username}
        setUsernameText={this.props.setUsernameText}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAppContainer);
