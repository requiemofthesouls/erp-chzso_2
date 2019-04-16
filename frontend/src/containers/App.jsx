import { connect } from 'react-redux';
import React from 'react';
import App from '../components/App';
import { setGlobalUsername } from '../store/auth/actions';


class MyAppContainer extends React.Component {
  render() {
    const { username, setGlobalUsername} = this.props;
    return (
      <App
        username={username}
        setGlobalUsername={setGlobalUsername}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAppContainer);
