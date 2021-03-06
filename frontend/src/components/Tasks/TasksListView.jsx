import React from 'react';
import axios from 'axios';

import Tasks from './Tasks';
import TaskModalContainer from '../../containers/Tasks/TaskModalView';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';
import { Icon, Spin } from 'antd';


class TaskList extends React.Component {

  Auth = new AuthServiceLogic();

  state = {
    tasks: [],
    users: [],
    visible: false,
    isLoading: true,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  updateTasks = () => {
    // Get all Tasks and put them to the redux
    axios.get(`http://127.0.0.1:8000/api/tasks/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setTasks(res.data);
        this.setState({ isLoading: false });
      });
  };

  setTasks = (tasks) => {
    this.props.setTasks(tasks);
  };


  componentWillMount() {
    this.updateTasks();
  };

  render() {
    const { isLoading } = this.state;
    const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin/>;

    return (

      <Spin size='large'
            indicator={indicator}
            spinning={isLoading}
      >

        <Tasks
          tasks={this.props.tasks}
          history={this.props.history}
          showModal={this.showModal}

        />

        <TaskModalContainer
          modal_title="Создание задачи"
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}

          requestMethod="post"
          updateTasks={this.updateTasks}
          closeModal={this.handleOk}
          history={this.props.history}
        >
        </TaskModalContainer>

      </Spin>

    );
  }
}

export default TaskList;
