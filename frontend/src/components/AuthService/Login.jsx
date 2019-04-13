import React from 'react';
import { Button, Checkbox, Form, Icon, Input, } from 'antd/lib/index';

import AuthServiceLogic from './AuthServiceLogic';
import { Link } from 'react-router-dom';


class NormalLoginForm extends React.Component {

  Auth = new AuthServiceLogic();


  componentWillMount() {
    if (this.Auth.loggedIn()) {
      alert(`Вы уже вошли!`);
      this.props.history.push('/');
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
          <Link className="login-form-forgot" to="">Забыли пароль?</Link>

          <Button icon="login" type="primary" htmlType="submit" className="login-form-button" block>Войти </Button>
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
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push('/projects');
        alert(`Привет, ${this.state.username}`);
      })
      .catch(err => {
        alert(err);
      });
  };




}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;
