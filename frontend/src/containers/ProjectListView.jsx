import React from 'react';
import axios from 'axios';

import HOST_ADDR from '../CONSTANTS';
import Projects from '../components/Projects';
import CustomForm from '../components/Form';
import AuthService from '../components/AuthService';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.auth_header = { 'Authorization': `JWT ${this.Auth.getToken()}` };
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.auth_header
    })
      .then(res => {
        this.setState({
          projects: res.data
        });
      });
  };

  render() {
    return (
      <div>
        <Projects data={this.state.projects}/>
        <br/>
        <h2>Create a project</h2>
        <CustomForm
          requestMethod="post"
          projectID={null}
          btnText="Create"/>
      </div>
    );
  }
}

export default ProjectList;
