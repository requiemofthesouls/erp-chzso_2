import React from 'react';
import LogListView from '../../components/Logs/LogListView';
import { Icon, Spin } from 'antd';
import axios from 'axios';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';


export default class LogListViewContainer extends React.Component {
  Auth = new AuthServiceLogic();
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logs: []
    };

    this.getLogs();
  }

  getLogs = () => {
    axios.get(`http://127.0.0.1:8000/api/logs/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.state.logs = res.data;
        this.setState({loading: false});
      });
  };

  render() {
    const { logs, loading } = this.state;
    const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin/>;


    return (
      <Spin size='large'
            indicator={indicator}
            spinning={loading}
      >
        <LogListView
          data={logs}
        />
      </Spin>
    );
  }
}
