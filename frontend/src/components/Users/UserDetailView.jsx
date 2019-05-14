import React from 'react';

import {
  Form,
  Switch,
  Button,
  Upload,
  Icon,
  Input,
  message,
  Collapse,
} from 'antd';

const emptyUser = {
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  is_active: false,
  is_staff: false,
  is_superuser: false,
};

class UserDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      defaultData: this.props.current_user ? this.props.current_user : emptyUser
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      defaultData: nextProps.current_user ? nextProps.current_user : emptyUser,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const userID = this.props.userID;
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      is_active,
      is_staff,
      is_superuser
    } = this.state.defaultData;
  };

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const imageUrl = this.state.imageUrl;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const {defaultData} = this.state;

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
              <Input type="password" placeholder="Текущий пароль" onChange={this.handleOldPasswordChange}/>
              <Input type="password" placeholder="Новый пароль" onChange={this.handleNewPasswordChange}/>
              <Input type="password" placeholder="Повторите новый пароль" onChange={this.handleConfirmPasswordChange}/>
            </Collapse.Panel>
          </Collapse>
        </Form.Item>

        <Form.Item label="Суперпользователь">
          <Switch
            defaultChecked={defaultData.is_superuser}
            onChange={() => this.state.defaultValue.is_superuser = !this.state.defaultValue.is_superuser}
          />
        </Form.Item>

        <Form.Item label="Персонал">
          <Switch
            defaultChecked={defaultData.is_staff}
            onChange={() => this.state.defaultValue.is_staff = !this.state.defaultValue.is_staff}
          />
        </Form.Item>

        <Form.Item label="Активный">
          <Switch
            defaultChecked={defaultData.is_active}
            onChange={() => this.state.defaultValue.is_active = !this.state.defaultValue.is_active}
          />
        </Form.Item>

        {/*TODO: Допилить аватарку*/}
        {/*<Form.Item label="Фотография">*/}
        {/*  <Upload*/}
        {/*    name="avatar"*/}
        {/*    listType="picture-card"*/}
        {/*    className="avatar-uploader"*/}
        {/*    showUploadList={false}*/}
        {/*    beforeUpload={this.beforeUpload}*/}
        {/*    onChange={this.handleAvatarChange}*/}
        {/*  >*/}
        {/*    {defaultData.avatar ? <img src={defaultData.avatar} alt="avatar"/> : uploadButton}*/}
        {/*  </Upload>*/}

        {/*</Form.Item>*/}

        <Form.Item wrapperCol={{span: 12, offset: 6}}>
          <Button type="primary" htmlType="submit">
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
    return (isJPG || isPNG) && isLt2M;
  };

  handleAvatarChange = (avatar) => {
    console.log('avatar', avatar)
  }
}

export default UserDetailView;
