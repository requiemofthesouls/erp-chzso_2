import React from 'react';
import {List, Avatar, Button, Skeleton} from 'antd';

import axios from 'axios';
import AuthServiceLogic from "../AuthService/AuthServiceLogic";

class UserListView extends React.Component {
  Auth = new AuthServiceLogic();

  state = {
    initLoading: true,
    loading: false,
    data: [],
  };

  componentWillMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.data,
      });
    });
  }


  getData = callback => {
    axios.get(`http://127.0.0.1:8000/api/users/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        callback(res);
      });
  };


  render() {
    const {initLoading, data} = this.state;

    return (
      <List
        bordered
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
          hideOnSinglePage: true,
        }}
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data}
        footer={
          <Button
          onClick={() => console.log("create user")}
          htmlType="submit"
          icon="user-add"
        />}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.avatar}/>
                }
                title={<a onClick={() => this.props.history.push(`users/${item.id}/`)}>{item.username}</a>}
                description={`id ${item.id}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default UserListView;
