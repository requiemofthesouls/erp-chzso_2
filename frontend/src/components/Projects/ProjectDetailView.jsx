import React from 'react';
import axios from 'axios/index';

import { Button, Card, Modal, message, Spin } from 'antd';
import CreateDeleteUpdateProjectForm from './CreateDeleteUpdateProjectForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

class ProjectDetail extends React.Component {
  Auth = new AuthServiceLogic();

  state = {
    project: [],
    isLoading: true
  };


  render() {
    return (

      <div>

        <CreateDeleteUpdateProjectForm
          current_project={this.props.current_project}
          requestMethod="put"
          projectID={this.props.match.params.projectID}
          btnText="Изменить"
          history={this.props.history}
          updateProjects={this.updateProjects}
        />

        <Button block onClick={this.handleDelete} type="danger" htmlType="submit">Удалить</Button>

      </div>
    );
  }


  handleDelete = () => {
    const projectID = this.props.match.params.projectID;
    axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
      headers: this.Auth.auth_header
    })
      .then(
        () => {
          this.updateProjects();
          this.props.history.push('/projects');
          message.success(`Проект был успешно удалён!`, 2.5);
        }, () => {
          message.error(`Не удалось удалить проект.`, 2.5);
          this.props.history.push('/projects');
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

}

export default ProjectDetail;
