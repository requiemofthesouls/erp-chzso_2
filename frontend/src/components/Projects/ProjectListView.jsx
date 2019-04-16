import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';

import Projects from './Projects';
import CreateDeleteUpdateProjectForm from './CreateDeleteUpdateProjectForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';


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

  updateProjects = () => {
    console.log('updating projects');
    // Get all Projects and put them to the redux
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setProjects(res.data);
      });
  };

  setProjects = (projects) => {
    this.props.setProjects(projects);
  };


  componentWillMount() {
    this.updateProjects();
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.showModal}
          htmlType="submit"
          icon="folder-add"
          style={{ marginBottom: 10 }}
        >
        </Button>

        <Button
          htmlType="submit"
          icon="delete"
          style={{
            marginBottom: 10,
            marginLeft: 10
          }}
        >
        </Button>

        <Projects
          projects={this.props.projects}
          history={this.props.history}

        />

        <Modal centered
               title="Создание проекта"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <CreateDeleteUpdateProjectForm
            requestMethod="post"
            projectID={null}
            btnText="Создать"
            updateProjects={this.updateProjects}
            closeModal={this.handleOk}
          />
        </Modal>
      </div>
    );
  }
}

export default ProjectList;
