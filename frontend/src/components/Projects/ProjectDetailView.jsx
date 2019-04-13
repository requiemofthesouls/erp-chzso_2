import React from 'react';
import axios from 'axios/index';

import { Button, Card, Modal } from 'antd';
import CreateDeleteUpdateProjectForm from './CreateDeleteUpdateProjectForm';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

class ProjectDetail extends React.Component {
  Auth = new AuthServiceLogic();

  state = {
    project: [],
  };

  componentWillMount() {
    const projectID = this.props.match.params.projectID;
    axios.get(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          project: res.data
        });
      });

  };


  render() {
    return (
      <div>
        {/*TODO: Неизменяемые поля при загрузке, при нажатии на кнопку изменить появляется возможность редактирования*/}
        {/*<Card title={this.state.project.title}>*/}
        {/*  <p>{this.state.project.description}</p>*/}
        {/*</Card>*/}
        {/*<Button onClick={this.showModal} htmlType="submit" type="primary" block*/}
        {/*        icon="folder-add">Изменить проект</Button>*/}
        {/*TODO: Не передается аргумент*/}
        <CreateDeleteUpdateProjectForm
          defaultData={this.state.project}
          requestMethod="put"
          projectID={this.props.match.params.projectID}
          btnText="Изменить"/>

        <Button block onClick={this.handleDelete} type="danger" htmlType="submit">Удалить</Button>

      </div>
    );
  }


  handleDelete = () => {
    const projectID = this.props.match.params.projectID;
    axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
      headers: this.Auth.auth_header
    });
    this.props.history.push('/projects');
    this.forceUpdate();
  };

}

export default ProjectDetail;
