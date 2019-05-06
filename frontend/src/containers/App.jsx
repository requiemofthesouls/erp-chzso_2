import { connect } from 'react-redux';
import React from 'react';
import App from '../components/App';
import { setGlobalUsername } from '../store/auth/actions';
import { setProjects } from '../store/projects/actions';


class MyAppContainer extends React.Component {
  render() {
    const {
      username,
      setGlobalUsername,
      setTasks,
      projects,
      current_project,
    } = this.props;
    return (
      <App
        username={username}
        setGlobalUsername={setGlobalUsername}
        projects={projects}
        setProjects={setProjects}
        current_project={current_project}
      />);
  }

}


const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    projects: state.projects.data,
  };

};

const mapDispatchToProps = {
  setGlobalUsername,
  setProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppContainer);
