import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';

import Tasks from './Tasks';
import CreateDeleteUpdateTaskForm from './CreateDeleteUpdateTasksForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';


class TaskList extends React.Component {

  Auth = new AuthServiceLogic();

  state = {
    tasks: [],
    users: [],
    visible: false,
  };

  showModal = () => {
    // TODO: Сюда передавать список юзеров и проектов для choice fields.
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
    console.log('updating tasks');
    // Get all Tasks and put them to the redux
    axios.get(`http://127.0.0.1:8000/api/tasks/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setTasks(res.data);
      });
  };

  setTasks = (tasks) => {
    this.props.setTasks(tasks);
  };


  componentWillMount() {
    this.updateTasks();
  };

  render() {
    return (
      <div>


        <Tasks
          tasks={this.props.tasks}
          history={this.props.history}
          showModal={this.showModal}

        />

        <Modal centered
               title="Создание задачи"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <CreateDeleteUpdateTaskForm
            requestMethod="post"
            taskID={null}
            btnText="Создать"
            updateTasks={this.updateTasks}
            closeModal={this.handleOk}
            history={this.props.history}
          />
        </Modal>
      </div>
    );
  }
}

export default TaskList;
