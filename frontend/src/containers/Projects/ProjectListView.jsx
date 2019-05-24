import React from 'react';
import ProjectList from '../../components/Projects/ProjectListView';
import { connect } from 'react-redux';
import { setProjects } from '../../store/projects/actions';
import { PageHeader } from 'antd';


class ProjectListContainer extends React.Component {
  render() {
    return (
      <div>

        <ProjectList
          projects={this.props.projects}
          setProjects={this.props.setProjects}
          history={this.props.history}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);

