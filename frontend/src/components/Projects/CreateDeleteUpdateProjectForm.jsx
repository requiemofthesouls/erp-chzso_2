import React from 'react';
import axios from 'axios';

import { Form, Input, Button, InputNumber, Tooltip, message, Spin } from 'antd';
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

class CreateDeleteUpdateProjectForm extends React.Component {
  Auth = new AuthServiceLogic();


  state = {
    projects: [],
    defaultData: this.props.current_project ? this.props.current_project : emptyProject,
  };


  componentWillMount() {
    console.log('--- current props before render ---', this.props);
    console.log('--- current state before render ---', this.state);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('--- received new props ---', nextProps);
    this.setState({
      defaultData: nextProps.current_project,
    }, () => console.log('--- new state ---', this.state));

  }


  handleFormSubmit = (event, requestMethod) => {
    event.preventDefault();
    const projectID = this.props.projectID;
    const { updateProjects, closeModal } = this.props;
    const { title, description, entry, priority } = this.state.defaultData;

    console.log('--- PUT ---', this.state.defaultData);

    switch (requestMethod) {
      case 'post':
        return axios.post(`http://127.0.0.1:8000/api/projects/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': entry,
          'priority': priority,
          'old_id': 0
        }, {
          headers: this.Auth.auth_header
        })
          .then((res) => {
            message.success(`Проект ${title} добавлен`, 2.5);
            updateProjects();
            closeModal();
          })
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': entry,
          'priority': priority,
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

    const { priority, defaultData } = this.state;
    const tips = <span>от 1 до 9</span>;
    const initialDescription = '<h1>Опишите ваш проект здесь, используя возможности редактора wysiwig.</h1>';


    return (
      <div>
        <Form onChange={this.handleChange} onSubmit={(e) => this.handleFormSubmit(e, this.props.requestMethod)}>
          <Form.Item label="Заголовок">
            <Input autoFocus name="title"
                   placeholder="Введите заголовок"
                   defaultValue={defaultData.title}
            />
            {/*TODO: при переходе на форму изменения проекта подставлять текущие данные каждого поля*/}
          </Form.Item>
          <Form.Item label="Описание">
            <CKEditor
              editor={ClassicEditor}
              data={defaultData.description}
              onBlur={(event, editor) => {
                const data = editor.getData();
                this.setState({ description: data });
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
          <Form.Item>
            <Button block type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  handlePriorityChange = (value) => {
    this.state.defaultData['priority'] = value;
  };

  handleChange = (e) => {
    this.state.defaultData[e.target.name] = e.target.value;
  };


}

export default CreateDeleteUpdateProjectForm;
