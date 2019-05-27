import React from 'react';
import { connect } from 'react-redux';
import { setProjects } from '../../store/projects/actions';
import axios from 'axios';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';
import { Alert, Icon, message, Spin, Modal, Drawer } from 'antd';
import CreateDeleteUpdateProjectForm from '../../components/Projects/CreateDeleteUpdateProjectForm';


class ProjectModalContainer extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      isLoading: true,
    };
    this.getUserlist();
  }

  getUserlist = () => {
    axios.get('http://127.0.0.1:8000/api/users/', {
      headers: this.Auth.auth_header
    })
      .then(
        (res) => {
          this.setState({
            userlist: res.data,
            isLoading: false
          });
        });
  };


  componentDidMount() {
  }

  render() {

    return (
      <Drawer
        title={this.props.title}
        width={700}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onClose={this.props.handleCancel}
      >
        <CreateDeleteUpdateProjectForm
          requestMethod="post"
          projectID={null}
          btnText="Создать"
          updateProjects={this.props.updateProjects}
          closeModal={this.props.handleOk}
          history={this.props.history}
          userlist={this.state.userlist}
        />
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModalContainer);

