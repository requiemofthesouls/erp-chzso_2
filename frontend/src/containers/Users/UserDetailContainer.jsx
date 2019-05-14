import React from 'react';
import axios from 'axios';
import {Alert, Icon, message, Spin} from 'antd';

import UserDetailView from '../../components/Users/UserDetailView';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';


class UserDetailContainer extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
    };
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    const userID = this.props.match.params.userID;
    axios.get(`http://127.0.0.1:8000/api/users/${userID}/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          user: res.data,
        }, () => this.setState({isLoading: false}));

      }, (res) => {
        message.error(`Ошибка ${res}`, 2.5);
        this.props.history.push('/users');
      });
  };


  componentDidMount() {
  }

  render() {
    const {isLoading} = this.state;

    const indicator = <Icon type="loading" style={{fontSize: 24}} spin/>;

    const user_detail_form = <UserDetailView
      history={this.props.history}
      match={this.props.match}
      current_user={this.state.user}
    />;

    return (
      <div>
        {isLoading && <Spin size='large' indicator={indicator}> {user_detail_form} </Spin>}
        {!isLoading && user_detail_form}
      </div>
    );
  }

}


export default UserDetailContainer;

