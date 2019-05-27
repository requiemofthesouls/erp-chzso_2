import React from 'react';
import axios from 'axios';

import ProjectModalContainer from '../../containers/Projects/ProjectModalView'
import Projects from './Projects';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';
import { Icon, Spin } from 'antd';


class ProjectList extends React.Component {

  Auth = new AuthServiceLogic();

  state = {
    projects: [],
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

  updateProjects = () => {
    // Get all Tasks and put them to the redux
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setProjects(res.data);
        this.setState({isLoading: false})
      });
  };

  setProjects = (projects) => {
    this.props.setProjects(projects);
  };


  componentWillMount() {
    this.updateProjects();
  };

  render() {
    const { isLoading } = this.state;
    const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin/>;

    return (
      <Spin size='large'
            indicator={indicator}
            spinning={isLoading}
      >


        <Projects
          projects={this.props.projects}
          history={this.props.history}
          showModal={this.showModal}

        />

        <ProjectModalContainer
          title="Создание проекта"
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}

          requestMethod="post"
          projectID={null}
          history={this.props.history}
          btnText="Создать"
          updateProjects={this.updateProjects}
          closeModal={this.handleOk}
        >
        </ProjectModalContainer>

        </Spin>
    );
  }
}

export default ProjectList;
