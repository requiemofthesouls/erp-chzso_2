import React, {Component} from 'react';
import axios from 'axios';
import {message, Icon, Spin} from 'antd';
import GanttDiagram from '../components/Gantt';
import AuthServiceLogic from "../components/AuthService/AuthServiceLogic";
import moment from 'moment';
import 'moment/locale/ru';


class GanttContainer extends Component {
  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Days',
      messages: [],
      isLoading: true,
      projects: {
        data: [],
        links: [
          // {id: 12, source: 12, target: 24, type: 1},
          // {id: 11, source: 11, target: 18, type: 1}
          ]
      },
    };
    this.getProjects();
  }

  // TODO: Есть баг когда id проекта и задачи совпадают.
  // TODO: Диаграмма перестаёт правильно отображаться или вовсе крашит страницу.
  getProjects = () => {
    axios.get(`http://127.0.0.1:8000/api/projects/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        const projects = res.data;
        for (let project of projects) {
          let formated_project = {
            id: project.id,
            open: true,
            text: project.title,
            type: "project",
            holder: project.manager_username,
          };
          this.state.projects.data.push(formated_project)
        }
        this.getTasks();
      }, (err) => {
        message.error(err.toString(), 2);
        this.setState({isLoading: false})
      });
  };

  getTasks = () => {
    axios.get(`http://127.0.0.1:8000/api/tasks/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        const tasks = res.data;
        for (let task of tasks) {
          let formated_task = {
            id: task.id,
            text: task.title,
            type: "task",
            parent: task.project_id,
            holder: task.assigned_on_username,
            start_date: moment(task.start).format('YYYY-MM-DD HH:SS'),
            end_date: moment(task.due).format('YYYY-MM-DD HH:SS'),
          };
          this.state.projects.data.push(formated_task)
        }
        this.setState({isLoading: false});
      }, (err) => {
        message.error(err.toString(), 2);
        this.setState({isLoading: false})
      });
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = {message};
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({messages});
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  };

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  };

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const {currentZoom, messages, isLoading, projects} = this.state;
    const indicator = <Icon type="loading" style={{fontSize: 24}} spin/>;
    const gantt =
      <div style={{height: "calc(100vh - 40px - 200px)"}}>
        <GanttDiagram
          tasks={projects}
          zoom={currentZoom}
          onDataUpdated={this.logDataUpdate}
        />
      </div>;
    return (


      <div>
        {isLoading && <Spin size='large' indicator={indicator}> {gantt} </Spin>}
        {!isLoading && gantt}
      </div>

    );
  }
}

export default GanttContainer;
