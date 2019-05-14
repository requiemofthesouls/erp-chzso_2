import React from 'react';
import {connect} from 'react-redux';
import {setProjects} from '../../store/projects/actions';

import {
  Alert,
  Icon,
  message,
  Spin,
  Modal,
} from 'antd';

import CreateDeleteUpdateTaskForm from "../../components/Tasks/CreateDeleteUpdateTasksForm";
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';
import axios from 'axios';

class TaskModalContainer extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.getUserlist();
  }

  getUserlist = () => {
    axios.get('http://127.0.0.1:8000/api/users/', {
      headers: this.Auth.auth_header
    })
      .then(
        (res) => {
          this.setState({
            userlist: res.data,
          }, () => this.getProjects());
        });
  };

  getProjects = () => {
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          projects: res.data,
          isLoading: false
        });
      });
  };

  componentDidMount() {
  }

  render() {
    const task_modal_form =
      <Modal centered
             title={this.props.modal_title}
             visible={this.props.visible}
             onOk={this.props.handleOk}
             onCancel={this.props.handleCancel}
      >
        <CreateDeleteUpdateTaskForm
          requestMethod="post"
          taskID={null}
          btnText="Создать"
          updateTasks={this.props.updateTasks}
          closeModal={this.props.handleOk}
          history={this.props.history}
          userlist={this.state.userlist}
          projects={this.state.projects}
        />
      </Modal>;

    return (
      <div>
        {task_modal_form}
      </div>
    );
  }

}

export default TaskModalContainer;
