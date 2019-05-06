import React from 'react';
import axios from 'axios/index';

import { Button, Card, Modal, message, Spin } from 'antd';
import CreateDeleteUpdateTaskForm from './CreateDeleteUpdateTasksForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

class TaskDetail extends React.Component {
  Auth = new AuthServiceLogic();

  state = {
    task: [],
    isLoading: true
  };


  render() {
    return (

      <div>

        <CreateDeleteUpdateTaskForm
          userlist={this.props.userlist}
          current_task={this.props.current_task}
          requestMethod="put"
          taskID={this.props.match.params.taskID}
          btnText="Изменить"
          history={this.props.history}
          updateTasks={this.updateTasks}
        />

        <Button block onClick={this.handleDelete} type="danger" htmlType="submit">Удалить</Button>
        <Button block onClick={() => console.log(this.props)} type="danger" htmlType="submit">props</Button>

      </div>
    );
  }


  handleDelete = () => {
    const taskID = this.props.match.params.taskID;
    axios.delete(`http://127.0.0.1:8000/api/tasks/${taskID}/`, {
      headers: this.Auth.auth_header
    })
      .then(
        () => {
          this.updateTasks();
          this.props.history.push('/tasks');
          message.success(`Задача была успешно удалена!`, 2.5);
        }, () => {
          message.error(`Не удалось удалить задачу.`, 2.5);
          this.props.history.push('/tasks');
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

}

export default TaskDetail;
