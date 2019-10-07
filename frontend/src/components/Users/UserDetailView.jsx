import React from 'react';

import {
  Form,
  Switch,
  Button,
  Upload,
  Icon,
  Input,
  message,
  Collapse, Avatar,
} from 'antd';

import AuthServiceLogic from '../AuthService/AuthServiceLogic';
import axios from 'axios';

const emptyUser = {
  email: '',
  first_name: '',
  last_name: '',
  username: '',
  is_active: false,
  is_staff: false,
  is_superuser: false,
};

class UserDetailView extends React.Component {
  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      avatar: null,
      imageUrl: '',
      defaultData: this.props.current_user ? this.props.current_user : emptyUser
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      defaultData: nextProps.current_user ? nextProps.current_user : emptyUser,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      id,
      avatar,
      first_name,
      last_name,
      username,
      email,
      password,
      is_active,
      is_staff,
      is_superuser,
      new_avatar
    } = this.state.defaultData;

    const body = new FormData();

    new_avatar ? body.append('avatar', new_avatar) : null;
    body.append('id', id);
    body.append('email', email);
    body.append('first_name', first_name);
    body.append('last_name', last_name);
    body.append('username', username);
    body.append('password', password);
    body.append('is_active', is_active);
    body.append('is_staff', is_staff);
    body.append('is_superuser', is_superuser);


    axios.put(`http://127.0.0.1:8000/api/users/${id}/`, body,
      {
        headers: this.Auth.auth_header
      })
      .then((res) => {
        this.props.history.push('/users');
        message.success(`Пользователь ${username} изменён.`, 2.5);
      })
      .catch(err => console.error(err));
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { defaultData } = this.state;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item label="Имя" hasFeedback>
          <Input
            onChange={this.handleFirstNameChange}
            defaultValue={defaultData.first_name}/>
        </Form.Item>

        <Form.Item label="Фамилия" hasFeedback>
          <Input
            onChange={this.handleLastNameChange}
            defaultValue={defaultData.last_name}/>
        </Form.Item>

        <Form.Item label="e-mail" hasFeedback>
          <Input
            onChange={this.handleEmailChange}
            defaultValue={defaultData.email}/>
        </Form.Item>

        <Form.Item label="Уникальное имя" hasFeedback>
          <Input
            onChange={this.handleUsernameChange}
            defaultValue={defaultData.username}/>
        </Form.Item>

        <Form.Item label="Пароль" hasFeedback>
          <Collapse>
            <Collapse.Panel header="Изменить" key="1">
              <Input style={{marginBottom: "10px"}} type="password" placeholder="Текущий пароль" onChange={this.handleOldPasswordChange}/>
              <Input style={{marginBottom: "10px"}} type="password" placeholder="Новый пароль" onChange={this.handleNewPasswordChange}/>
              <Input type="password" placeholder="Повторите новый пароль" onChange={this.handleConfirmPasswordChange}/>
            </Collapse.Panel>
          </Collapse>
        </Form.Item>

        <Form.Item label="Суперпользователь">
          <Switch
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="close"/>}
            defaultChecked={defaultData.is_superuser}
            onChange={this.handleIsSuperuserChange}
          />
        </Form.Item>

        <Form.Item label="Персонал">
          <Switch
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="close"/>}
            defaultChecked={defaultData.is_staff}
            onChange={this.handleIsStaffChange}
          />
        </Form.Item>

        <Form.Item label="Активный">
          <Switch
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="close"/>}
            defaultChecked={defaultData.is_active}
            onChange={this.handleIsActiveChange}
          />
        </Form.Item>

        <Form.Item label="Фотография">

          {defaultData.avatar ? <Avatar shape="square" size={64} src={defaultData.avatar}/> : <span/>}


          <Upload
            name="avatar"
            beforeUpload={this.beforeUpload}
            onChange={this.handleAvatarChange}
            listType="picture"
            fileList={this.state.fileList}
            onRemove={this.state.fileList = []}
          >
            <Button>
              <Icon type="upload"/> Загрузить
            </Button>

          </Upload>


        </Form.Item>

        <Form.Item wrapperCol={{
          span: 12,
          offset: 6
        }}>
          <Button
            block
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>

        </Form.Item>
      </Form>
    );
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';

    if (!isJPG && !isPNG) {
      message.error('Изображение должно быть в формате JPG или PNG!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Изображение должно быть меньше 2MB!');
    }
    return false;
  };

  handleAvatarChange = ({ file, fileList }) => {
    this.setState({ fileList: [fileList.pop()] });
    this.state.defaultData.new_avatar = file;
  };

  handleIsActiveChange = () => {
    this.state.defaultData.is_active = !this.state.defaultData.is_active;
  };

  handleIsStaffChange = () => {
    this.state.defaultData.is_staff = !this.state.defaultData.is_staff;
  };

  handleIsSuperuserChange = () => {
    this.state.defaultData.is_superuser = !this.state.defaultData.is_superuser;
  };

  handleFirstNameChange = (event) => {
    this.state.defaultData.first_name = event.target.value;
  };

  handleLastNameChange = (event) => {
    this.state.defaultData.last_name = event.target.value;
  };

  handleEmailChange = (event) => {
    this.state.defaultData.email = event.target.value;
  };

  handleUsernameChange = (event) => {
    this.state.defaultData.username = event.target.value;
  };

  handleOldPasswordChange = (event) => {
    console.log(event.target.value);
  };

  handleNewPasswordChange = (event) => {
    console.log(event.target.value);
  };

  handleConfirmPasswordChange = (event) => {
    console.log(event.target.value);
  };


}

export default UserDetailView;
