import React from 'react';
import axios from 'axios';

import Projects from '../components/Projects';
import CustomForm from '../components/Form';

class ProjectList extends React.Component {

  state = {
    projects: []
  };

  componentDidMount() {
    axios.get('http://backend:8080/api/projects/')
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
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
          btnText="Create" />
      </div>
    );
  }
}

export default ProjectList;
