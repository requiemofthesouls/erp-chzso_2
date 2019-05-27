import {connect} from 'react-redux';
import React from 'react';
import App from '../components/App';
import {setGlobalUsername} from '../store/auth/actions';
import {setProjects} from '../store/projects/actions';
import {setTasks} from "../store/tasks/actions";


class MyAppContainer extends React.Component {
  render() {
    const {
      username,
      setGlobalUsername,
      setProjects,
      setTasks,
      projects,
      tasks,
      current_project,
      current_task
    } = this.props;
    return (
      <App
        username={username}
        setGlobalUsername={setGlobalUsername}
        projects={projects}
        tasks={tasks}
        setProjects={setProjects}
        setTasks={setTasks}
        current_project={current_project}
        current_task={current_task}
      />);
  }

}


const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    projects: state.projects.data,
    tasks: state.tasks.data,
  };

};

const mapDispatchToProps = {
  setGlobalUsername,
  setProjects,
  setTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppContainer);
