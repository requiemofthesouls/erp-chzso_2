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
  message, Badge, Tag, Tooltip
} from 'antd';

import axios from 'axios';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';
import { Link } from 'react-router-dom';

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
    const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin/>;

    return (
      <div>

        <Spin size='large'
              indicator={indicator}
              spinning={initLoading}
        >
          <List
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5,
              hideOnSinglePage: true,
            }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[
                <Button
                  block
                  onClick={() => this.props.history.push(`users/${item.id}/`)}
                  htmlType="submit"
                  icon="edit"
                  style={{ marginBottom: '0.7em' }}
                >
                  Редактировать
                </Button>,

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
              ]}>


                <List.Item.Meta
                  avatar={<Avatar src={item.avatar}/>}
                  title={<a onClick={() => this.props.history.push(`users/${item.id}/`)}>{item.username}</a>}
                  description={`${item.first_name} ${item.last_name}`}
                />


                <div style={{marginLeft: '5em'}}>
                  {item.is_superuser ?
                    <Tooltip title={'Пользователь с повышенными привелегиями'}><Tag color="gold">Cуперпользователь</Tag></Tooltip> : null}
                  {item.is_staff ?
                    <Tooltip title={'Имеет доступ к интерфейсу администрирования'}><Tag color='geekblue'>Персонал</Tag></Tooltip> : null}
                  {item.is_active ?
                    <Tooltip title={'Данный аккаунт активен и готов к использованию'}><Tag color="green">Активный</Tag></Tooltip> :
                    <Tooltip title={'Данный аккаунт временно отключен'}><Tag color="red">Не активный</Tag></Tooltip>}
                </div>
              </List.Item>
            )}
          />
        </Spin>
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
