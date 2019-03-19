import React from 'react';
import axios from 'axios';

import HOST_ADDR from '../CONSTANTS'
import Projects from '../components/Projects';
import CustomForm from '../components/Form';

class ProjectList extends React.Component {

  state = {
    projects: []
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/projects/`)
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
