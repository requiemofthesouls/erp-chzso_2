import React from 'react';
import {connect} from 'react-redux';
import {setProjects} from '../../store/projects/actions';
import axios from 'axios';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';
import {Alert, Icon, message, Spin, Modal} from 'antd';
import CreateDeleteUpdateProjectForm from "../../components/Projects/CreateDeleteUpdateProjectForm";


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
    const {isLoading} = this.state;

    const indicator = <Icon type="loading" style={{fontSize: 24}} spin/>;

    const project_modal_form =
      <Modal centered
             title={this.props.title}
             visible={this.props.visible}
             onOk={this.props.handleOk}
             onCancel={this.props.handleCancel}
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
      </Modal>;

    return (
      <div>
        {isLoading && <Spin size='large' indicator={indicator}> {project_modal_form} </Spin>}
        {!isLoading && project_modal_form}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModalContainer);

