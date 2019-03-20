import HOST_ADDR from '../CONSTANTS'

import React from 'react';
import axios from 'axios';

import { Button, Card } from 'antd';
import CustomForm from '../components/Form';

class ProjectDetail extends React.Component {

  state = {
    project: {}
  };

  componentDidMount() {
    const projectID = this.props.match.params.projectID;
    axios.get(`http://127.0.0.1:8000/api/projects/${projectID}/`)
      .then(res => {
        this.setState({
          project: res.data
        });
      });
  };

  handleDelete = (event) => {
    const projectID = this.props.match.params.projectID;
    axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}/`);
    this.props.history.push('/projects');
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <Card title={this.state.project.title}>
          <p>{this.state.project.description}</p>
        </Card>
        <CustomForm
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
