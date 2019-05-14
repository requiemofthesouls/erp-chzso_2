import React from 'react';
import TaskDetail from '../../components/Tasks/TasksDetailView';
import {connect} from 'react-redux';
import {setTasks} from '../../store/tasks/actions';
import axios from 'axios';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';
import {Alert, Icon, message, Spin} from 'antd';


class TaskDetailContainer extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      task: null,
      isLoading: true,
    };
    this.getUserlist();
    this.getCurrentTask();
  }

  getUserlist = () => {
    axios.get('http://127.0.0.1:8000/api/users/', {
      headers: this.Auth.auth_header
    })
      .then(
        (res) => {
          this.setState({userlist: res.data});
        });
  };

  getCurrentTask = () => {
    console.log('loading');
    const taskID = this.props.match.params.taskID;
    axios.get(`http://127.0.0.1:8000/api/tasks/${taskID}/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          task: res.data,
        }, () => this.setState({isLoading: false}));

      }, (res) => {
        message.error(`Ошибка ${res}`, 2.5);
        this.props.history.push('/tasks');
      });
  };


  componentDidMount() {
    console.log('container props', this.props)
  }

  render() {
    const {isLoading} = this.state;

    const indicator = <Icon type="loading" style={{fontSize: 24}} spin/>;

    const task_detail_form = <TaskDetail
      setTasks={this.props.setTasks}
      history={this.props.history}
      match={this.props.match}
      current_task={this.state.task}
      userlist={this.state.userlist}
      projects={this.props.projects}
    />;

    return (
      <div>
        {isLoading && <Spin size='large' indicator={indicator}> {task_detail_form} </Spin>}
        {!isLoading && task_detail_form}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.data,
    projects: state.projects.data,
  };

};

const mapDispatchToProps = {
  setTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailContainer);

