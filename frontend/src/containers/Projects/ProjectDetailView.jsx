import React from 'react';
import ProjectDetailView from '../../components/Projects/ProjectDetailView';
import { connect } from 'react-redux';
import { setProjects } from '../../store/projects/actions';
import axios from 'axios';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';
import { message, Spin } from 'antd';


class ProjectDetailContainer extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      isLoading: true,
    };
    this.getCurrentProject();
  }


  getCurrentProject = () => {
    console.log('loading');
    const projectID = this.props.match.params.projectID;
    axios.get(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          project: res.data,
        }, () => this.setState({ isLoading: false }));

      }, (res) => {
        message.error(`Ошибка ${res}`, 2.5);
        this.props.history.push('/projects');
      });
  };


  componentDidMount() {

    console.log('finished loading');

  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && <Spin size='large'/>}
        {!isLoading &&
        <ProjectDetailView
          projects={this.props.projects}
          setProjects={this.props.setProjects}
          history={this.props.history}
          match={this.props.match}
          current_project={this.state.project}
        />
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.data,
  };

};

const mapDispatchToProps = {
  setProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailContainer);

