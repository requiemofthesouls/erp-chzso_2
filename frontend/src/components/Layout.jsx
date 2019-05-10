import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import locale from 'antd/lib/date-picker/locale/ru_RU';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Button,
  message,
  Calendar,
  Badge
} from 'antd';

import AuthServiceLogic from './AuthService/AuthServiceLogic';

const { Header, Content, Sider } = Layout;


function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'Новый проект'
        },
        {
          type: 'success',
          content: 'Успешный проект'
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'Опасный проект'
        },
        {
          type: 'success',
          content: 'Успешный проект'
        },
        {
          type: 'error',
          content: 'Ошибочный проект'
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'Опасный проект'
        },
        {
          type: 'success',
          content: 'Успешный проект'
        },
        {
          type: 'error',
          content: 'Ошибочный проект'
        },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>
        ))
      }
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}


class RootLayout extends React.Component {

  Auth = new AuthServiceLogic();

  state = {};


  setUsername = (username) => {
    this.props.setGlobalUsername(username);
  };


  componentWillMount() {

  }

  render() {
    const { username, children } = this.props;
    const calendar = <Calendar

      locale={locale}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}/>;

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
                <Link to='/logout' onClick={this.handleLogout}><Icon type="logout"/>Выйти</Link>
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
                <Link to='/projects'/>
              </Menu.Item>

              <Menu.Item key="nav2">
                <Icon type="pic-center"/>
                Задачи
                <Link to='/tasks'/>
              </Menu.Item>

              <Menu.Item key="nav3">
                <Icon type="usergroup-add"/>
                Пользователи
                <Link to='/users'/>
              </Menu.Item>

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
              {this.props.location.pathname === '/' ? calendar : children}
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
  };
}


export default withRouter(RootLayout);
