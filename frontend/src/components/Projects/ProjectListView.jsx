import React from 'react';
import axios from 'axios/index';

import Projects from './Projects';
import CreateDeleteUpdateProjectForm from './CreateDeleteUpdateProjectForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';
import { Alert, Button, Modal } from 'antd/lib/index';
import { Link } from 'react-router-dom';

class ProjectList extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      users: [],
      visible: false,

    };


  }

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


  handleCurrentUser = () => {
    for (let project of this.state.projects) {
      for (let user of this.state.users) {
        if (project.manager_id === user.id) {
          project['manager_username'] = user.username;
        }
      }
    }
  };

  // TODO: fix username appearance for manager


  componentWillMount() {
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          projects: res.data
        });

        axios.get(`http://127.0.0.1:8000/auth/users/`, {
          headers: this.Auth.auth_header
        })
          .then(res => {
              this.setState({
                users: res.data
              }, () => this.handleCurrentUser());
            }
          );
      });
  };

    render() {
    return (
      <div>
        <Projects data={this.state.projects}/>
        <Button onClick={this.showModal} htmlType="submit"
                type="primary" block icon="folder-add">
          Создать проект
        </Button>

        <Modal centered
               title="Создание проекта"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <CreateDeleteUpdateProjectForm
            requestMethod="post"
            projectID={null}
            btnText="Создать"/>
        </Modal>
      </div>
    );
  }
}

export default ProjectList;
