import React from 'react';
import {
  List,
  Avatar,
  Button,
  Skeleton,
  Icon,
  Spin,
  Popover,
  Popconfirm,
  message,
} from 'antd';

import axios from 'axios';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

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

  updateUsers = () => {
    this.getData(res => this.setState({ data: res.data }));
  };


  render() {
    const { initLoading, data } = this.state;


    return (
      <div>

        <List
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
            hideOnSinglePage: true,
          }}
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (

            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>

                <Popover
                  title={`Пользователь ${item.username}`}
                  placement={'topLeft'}
                  content={
                    <div>

                      <Button
                        block
                        onClick={() => this.props.history.push(`users/${item.id}/`)}
                        htmlType="submit"
                        icon="edit"
                        style={{ marginBottom: '0.7em' }}
                      >
                        Редактировать
                      </Button>

                      <Popconfirm
                        title="Вы уверены что хотите удалить данного пользователя?"
                        onConfirm={() => this.handlePopconfirmDeleteUser(item.id)}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <Button
                          block
                          htmlType="submit"
                          icon="user-delete"
                          style={{ marginBottom: '0.7em' }}
                        >
                          Удалить
                        </Button>

                      </Popconfirm>

                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.avatar}/>
                    }
                    title={<a onClick={() => this.props.history.push(`users/${item.id}/`)}>{item.username}</a>}
                    description={`id ${item.id}`}
                  />
                </Popover>
              </Skeleton>
            </List.Item>

          )}
        />
      </div>
    );
  }

  handlePopconfirmDeleteUser = (user_id) => {
    axios.delete(`http://127.0.0.1:8000/api/users/${user_id}/`, {
      headers: this.Auth.auth_header
    })
      .then(
        () => {
          message.success('Пользователь удалён.', 2);
          this.updateUsers();
        },
        () => {
          message.error(`Не удалось удалить пользователя.`, 2.5);
        });

  };

}

export default UserListView;
