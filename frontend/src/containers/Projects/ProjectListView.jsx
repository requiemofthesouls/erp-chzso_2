import React from 'react';
import ProjectList from '../../components/Projects/ProjectListView';
import { connect } from 'react-redux';
import { setProjects } from '../../store/projects/actions';


class ProjectListContainer extends React.Component {
  render() {
    return (
      <ProjectList
        projects={this.props.projects}
        setProjects={this.props.setProjects}
        history={this.props.history}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);

