import React from 'react';

import { Button, Checkbox, Form, Icon, Input, } from 'antd';
import axios from 'axios';
import AuthService from './AuthService';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      alert(`Вы уже вошли!`);
      this.props.history.replace('/');
    }
  }

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
            <Input name='username' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
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
          <a className="login-form-forgot" href="">Забыли пароль?</a>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button> <span>  </span>
          <a href="/signup">Зарегистрироваться!</a>
        </Form.Item>
      </Form>
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/projects');
        alert(`Привет, ${this.state.username}`)
      })
      .catch(err => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  }


}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;
