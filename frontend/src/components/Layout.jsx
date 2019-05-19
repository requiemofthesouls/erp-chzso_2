import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Button,
  message,
  Calendar,
  Badge,
  Spin,

} from 'antd';

import AuthServiceLogic from './AuthService/AuthServiceLogic';
import GanttContainer from '../containers/Gantt';
import UserAddView from './Users/UserAddView';

const { Header, Content, Sider } = Layout;

class RootLayout extends React.Component {

  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {};
  }

  setUsername = (username) => {
    this.props.setGlobalUsername(username);
  };

  componentDidUpdate() {
  }


  render() {

    const { username, children } = this.props;
    const gantt = <GanttContainer/>;


    return (
      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['title']}
            style={{
              lineHeight: '64px',
            }}
          >
            <Menu.Item
              key='title'
              style={{ float: 'left' }}>
              <Link to='/'>
                <Icon type="sliders"/>
                ERP ЧЗСО
              </Link>
            </Menu.Item>


            <Menu.Item key="login/logout" style={{ float: 'right' }}>
              {this.Auth.loggedIn() ?
                <Link to='' onClick={this.handleLogout}><Icon type="logout"/>Выйти</Link>
                : <Link to='/login'><Icon type="login"/>Войти</Link>
              }
            </Menu.Item>

            {this.Auth.loggedIn() ?
              <Menu.Item style={{ float: 'right' }} key='user'><Icon type="user"/>{username}</Menu.Item> :
              <span/>}

          </Menu>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={180}
            style={{ background: '#fff' }}>

            <Menu
              mode="vertical"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0
              }}
            >
              <Menu.Item key="nav1">
                <Icon type="project"/>
                Проекты
                <Link to='/projects'/>
              </Menu.Item>

              <Menu.Item key="nav2">
                <Icon type="pic-center"/>
                Задачи
                <Link to='/tasks'/>
              </Menu.Item>

              <Menu.SubMenu
                key="users"
                title={
                  <span>
                    <Icon type="usergroup-add"/>
                    <span>Пользователи</span>
                  </span>
                }
              >
                <Menu.Item key="userlist">
                  <Icon type="unordered-list"/>
                  Список
                  <Link to='/users'/>
                </Menu.Item>

                <Menu.Item
                  key="useradd">
                  <UserAddView/>
                </Menu.Item>

                <Menu.Item key="finduser">
                  <Icon type="search"/>
                  Искать
                  <Link to='/users/search'/>
                </Menu.Item>

              </Menu.SubMenu>


              <Menu.Item key="nav4">
                <Icon type="user"/>
                Работники цеха
                <Link to='/workers'/>
              </Menu.Item>

              <Menu.Item key="nav5">
                <Icon type="setting"/>
                Операции
                <Link to='/jobitems'/>
              </Menu.Item>

              <Menu.Item key="nav6">
                <Icon type="database"/>
                Логи операций
                <Link to='/joblogitems'/>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}/>
            <Content style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
              {this.props.location.pathname === '/' ? gantt : children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  handleLogout = () => {
    message.success(`Сессия завершена`, 2.5);
    this.Auth.logout();
    this.setUsername('');
    setTimeout(() => window.location.reload(), 1000);
  };
}


export default withRouter(RootLayout);
