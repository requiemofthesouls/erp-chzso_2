import React from 'react';
import {
  Form, Input, Tooltip, Icon, Select, Button, message,
} from 'antd';

import AuthServiceLogic from './AuthServiceLogic';


class RegistrationForm extends React.Component {

  Auth = new AuthServiceLogic();

  state = {};


  setUsername = (username) => {
    this.props.setGlobalUsername(username);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+7',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
      </Select>
    );


    return (
      <Form
        {...formItemLayout}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className={"signup-form"}

      >
        <Form.Item
          label="E-mail"

        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'Вы ввели некорректный E-mail!',
            }, {
              required: true,
              message: 'Пожалуйста введите ваш E-mail!',
            }],
          })(
            <Input autoFocus name="email" type='email'/>
          )}
        </Form.Item>
        <Form.Item
          label="Пароль"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите пароль!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input name="password" type="password"/>
          )}
        </Form.Item>
        <Form.Item
          label="Ещё раз"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите пароль ещё раз!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input name="confirm_password" type="password" onBlur={this.handleConfirmBlur}/>
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              Логин&nbsp;
              <Tooltip title="Как бы вы хотели чтобы другие звали вас?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите ваш логин!',
              whitespace: true
            }],
          })(
            <Input name="username"/>
          )}
        </Form.Item>

        <Form.Item
          label="Телефон"
        >
          {getFieldDecorator('phone', {
            rules: [{
              required: true,
              message: 'Пожалуйста введите номер телефона!'
            }],
          })(
            <Input name="phone_number" type='number' addonBefore={prefixSelector} style={{ width: '100%' }}/>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button block type="primary" htmlType="submit">Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    );
  }

  validateToNextPassword = (e) => {
    let firstPassword = this.state.password;
    let secondPassword = this.state.confirm_password;
    // TODO: Password validator
    if (firstPassword !== secondPassword) {
      // console.log('Пароли не совпадают');
    }
  };

  compareToFirstPassword = (e) => {
    let firstPassword = this.state.password;
    let secondPassword = this.state.confirm_password;
    // TODO: Password validator
    if (secondPassword !== firstPassword) {
      // console.log('Пароли не совпадают');
    }
  };


  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.Auth.register(this.state.username, this.state.password)
      .then(res => {
        message.success(`Пользователь ${this.state.username} успешно зарегистрирован.`, 2.5);
        this.props.history.push('/');
        this.setUsername(this.state.username);
      })
      .catch(err => {
        alert(err);
      });
  };
}

const SignupForm = Form.create({ name: 'signup-form' })(RegistrationForm);

export default SignupForm;
