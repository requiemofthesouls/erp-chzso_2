import React from 'react';
import { message, Button, Checkbox, Form, Icon, Input, } from 'antd/lib/index';

import AuthServiceLogic from './AuthServiceLogic';
import { Link } from 'react-router-dom';
import axios from 'axios';


class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.Auth.loggedIn()) {
      message.info(`Вы уже вошли!`, 2.5);
      this.props.history.push('/');
    }

    this.state = {
      user: null,
      loading: false,
    };
  }


  Auth = new AuthServiceLogic();


  setUsername = (username) => {
    this.props.setGlobalUsername(username);
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onChange={this.handleChange} onSubmit={this.handleFormSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите имя пользователя!'
            }],
          })(
            <Input autoFocus name='username' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   placeholder="Имя пользователя"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите пароль!'
            }],
          })(
            <Input name='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                   placeholder="Пароль"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Запомнить меня</Checkbox>
          )}
          <Link className="login-form-forgot" to="">Забыли пароль?</Link>

          <Button
            icon="login"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
            block
          >
            Войти
          </Button>
          <Button type="primary" href="/signup" htmlType="submit" icon="user-add" block>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    );
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        message.info(`Привет, ${this.state.username}`, 2.5);
        this.setState({ loading: false });
        this.props.history.push('/projects');
        this.setUsername(this.state.username);
      })
      .catch(err => {
        message.error(err.toString(), 2.5);
        this.setState({ loading: false });
      });
  };
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;
