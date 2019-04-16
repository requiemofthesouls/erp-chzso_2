import React from 'react';
import ProjectDetailView from '../../components/Projects/ProjectDetailView';
import { connect } from 'react-redux';
import { setProjects } from '../../store/projects/actions';


class ProjectDetailContainer extends React.Component {
  render() {
    return (
      <ProjectDetailView
        projects={this.props.projects}
        setProjects={this.props.setProjects}
        history={this.props.history}
        match={this.props.match}
      />);
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

