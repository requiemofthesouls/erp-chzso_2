import React from 'react';
import axios from 'axios';

import { Button, Form, Input, InputNumber, message, Select, Tooltip } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

const emptyProject = {
  'title': '',
  'active': '',
  'description': '',
  'entry': '',
  'priority': 1,
  'old_id': '',
};

let emptyUserlist = [{
  'id': '',
  'username': ''
}];

class CreateDeleteUpdateProjectForm extends React.Component {
  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);

    this.state = {
      // TODO: Список пользователей не обновляется, т.к.
      //  при открытии модального окна пересобирается сама форма, а не контейнер.
      //  Можно вынести обработку этого действия сюда.
      userlist: this.props.userlist ? this.props.userlist : emptyUserlist,
      projects: [],
      new_manager: null,
      defaultData: this.props.current_project ? this.props.current_project : emptyProject,
    };

  }


  componentWillMount() {
    console.log('--- current props before render ---', this.props);
    console.log('--- current state before render ---', this.state);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('--- received new props ---', nextProps);
    this.setState({
      userlist: nextProps.userlist ? nextProps.userlist : emptyUserlist,
      defaultData: nextProps.current_project ? nextProps.current_project : emptyProject,
    }, () => console.log('--- new state ---', this.state));

  }


  handleFormSubmit = (event, requestMethod) => {
    event.preventDefault();
    const projectID = this.props.projectID;
    const { updateProjects, closeModal } = this.props;
    const { title, description, entry, priority, manager_id } = this.state.defaultData;

    console.log('--- PUT ---', this.state.defaultData);

    switch (requestMethod) {
      case 'post':
        return axios.post(`http://127.0.0.1:8000/api/projects/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': entry,
          'priority': priority,
          'manager_id': manager_id,
          'old_id': 0
        }, {
          headers: this.Auth.auth_header
        })
          .then((res) => {
            closeModal();
            message.success(`Проект ${title} добавлен`, 2.5);
            updateProjects();
          })
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': entry,
          'priority': priority,
          'manager_id': manager_id,
          'old_id': 0
        }, {
          headers: this.Auth.auth_header
        })
          .then((res) => {
            message.success(`Проект ${title} обновлён`, 2.5);
            this.props.history.push('/projects');
            updateProjects();
          })
          .catch(err => console.error(err));
    }
  };

  componentDidMount() {
    console.log('current state after render ---', this.state);
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const { defaultData } = this.state;
    const tips = <span>от 1 до 9</span>;
    const last_modified = new Date(defaultData.last_modified);

    const users = this.state.userlist.map((user) =>
      <Option value={user.id.toString()}>{user.username}</Option>
    );


    return (
      <div>
        <Form onChange={this.handleChange} onSubmit={(e) => this.handleFormSubmit(e, this.props.requestMethod)}>
          <Form.Item label="Заголовок">
            <Input autoFocus name="title"
                   placeholder="Введите заголовок"
                   defaultValue={defaultData.title}
            />
          </Form.Item>
          <Form.Item label="Ответственный">
            <Select
              name="manager"
              mode="single"
              placeholder="Выберите ответственного."
              defaultValue={defaultData.manager_username}
              onChange={this.handleManagerChange}
            >
              {users}
              {/*TODO: Поправить в бекенде назначение ответственного.*/}
            </Select>
          </Form.Item>
          <Form.Item label="Описание">
            <CKEditor
              editor={ClassicEditor}
              data={defaultData.description}
              onChange={(event, editor) => {
                defaultData['description'] = editor.getData();
              }}
            />
          </Form.Item>
          <Form.Item label="Артикул">
            <Input
              name="entry"
              placeholder="Введите артикул"
              defaultValue={defaultData.entry}
            />
          </Form.Item>
          <Form.Item
            label="Приоритет"
          >
            <Tooltip placement='right' title={tips}>
              <InputNumber
                min={1}
                max={9}
                defaultValue={defaultData.priority}
                onChange={this.handlePriorityChange}
                name="priority"
              />
            </Tooltip>
          </Form.Item>
          {this.props.btnText === 'Изменить' ?
            <div>
              <Form.Item label='Последнее изменение'>
                <Input readOnly defaultValue={last_modified.toLocaleDateString('ru', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })
                }/>
              </Form.Item>
            </div>
            : <span/>}
          <Form.Item>
            <Button block type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  handleManagerChange = (value) => {
    this.state.defaultData.manager_id = value;
  };

  handlePriorityChange = (value) => {
    this.state.defaultData['priority'] = value;
  };

  handleChange = (e) => {
    this.state.defaultData[e.target.name] = e.target.value;
  };


}

export default CreateDeleteUpdateProjectForm;
