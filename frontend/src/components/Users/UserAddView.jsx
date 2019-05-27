import React from 'react';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon, Tooltip, message,
} from 'antd';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

const { Option } = Select;

class UserAddForm extends React.Component {

  Auth = new AuthServiceLogic();
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+7',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
      </Select>
    );

    return (
      <div>
        <div onClick={this.showDrawer}>
          <Icon type="user-add"/>
          Добавить
        </div>

        <Drawer
          title="Создание нового пользователя"
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form
            {...formItemLayout}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}>
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
                <span>Логин&nbsp;
                  <Tooltip title="Как бы вы хотели чтобы другие звали вас?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  message: 'Пожалуйста введите ваш никнейм!',
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

            <Form.Item>
              <Button block type="primary" htmlType="submit">Создать</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.Auth.add_user(this.state.username, this.state.password)
      .then(res => {
        message.success(`Пользователь ${this.state.username} успешно добавлен.`, 2.5);
        this.onClose();
      })
      .catch(err => {
        alert(err);
      });
  };

}

const UserAddView = Form.create()(UserAddForm);

export default UserAddView;
