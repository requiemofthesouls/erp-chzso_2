import React from 'react';
import axios from 'axios/index';

import { Button, Card } from 'antd/lib/index';
import CreateDeleteUpdateProjectForm from './CreateDeleteUpdateProjectForm';
import AuthService from './AuthService';

class ProjectDetail extends React.Component {
  Auth = new AuthService();
  state = {
    projects: [],
  };

  componentDidMount() {
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

  handleDelete = () => {
    const projectID = this.props.match.params.projectID;
    axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
      headers: this.Auth.auth_header
    });
    this.props.history.push('/projects');
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <Card title={this.state.project.title}>
          <p>{this.state.project.description}</p>
        </Card>
        <CreateDeleteUpdateProjectForm
          requestMethod="put"
          projectID={this.props.match.params.projectID}
          btnText="Update"/>
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">Delete</Button>
        </form>
      </div>
    );
  }
}

export default ProjectDetail;
