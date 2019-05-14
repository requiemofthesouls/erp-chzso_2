import React from 'react';
import { connect } from 'react-redux';

import { setTasks } from '../../store/tasks/actions';
import TaskList from '../../components/Tasks/TasksListView';


class TaskListContainer extends React.Component {
  render() {
    return (
      <TaskList
        tasks={this.props.tasks}
        setTasks={this.props.setTasks}
        history={this.props.history}
      />);
  }

}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.data,
  };

};

const mapDispatchToProps = {
  setTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

