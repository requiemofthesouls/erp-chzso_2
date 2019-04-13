import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd/lib/index';
import { Link, Redirect, withRouter } from 'react-router-dom';
import AuthServiceLogic from './AuthService/AuthServiceLogic';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import authServiceWrapper from './AuthService/AuthServiceWrapper';


class RootLayout extends React.Component {

  Auth = new AuthServiceLogic();

  state = {
    user: null,
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      const { username } = this.Auth.getProfile();
      this.setState({ user: username });
    }
  }

  render() {

    return (
      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              lineHeight: '64px',
              float: 'right'
            }}
          >
            {this.state.user ? <Menu.Item key='user'><Icon type="user"/>{this.state.user}</Menu.Item> : <span/>}

            <Menu.Item key="login/logout">
              {this.Auth.loggedIn() ?
                <Link to='/logout' onClick={this.handleLogout}><Icon type="logout"/>Выйти</Link>
                : <Link to='/login'><Icon type="login"/>Войти</Link>
              }
            </Menu.Item>

          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>

            <Menu
              mode="inline"
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
                <Link to={'/projects'}/>
              </Menu.Item>

              <Menu.Item key="nav2">
                <Icon type="pic-center"/>
                Задачи
                <Link to={'/tasks'}/>
              </Menu.Item>

              <Menu.Item key="nav3">
                <Icon type="usergroup-add"/>
                Пользователи
              </Menu.Item>

              <Menu.Item key="nav4">
                <Icon type="user"/>
                Работники цеха
              </Menu.Item>

              <Menu.Item key="nav5">
                <Icon type="setting"/>
                Операции
              </Menu.Item>

              <Menu.Item key="nav6">
                <Icon type="database"/>
                Логи операций
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
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  handleLogout = () => {
    this.Auth.logout();
  };
}


export default withRouter(RootLayout);
