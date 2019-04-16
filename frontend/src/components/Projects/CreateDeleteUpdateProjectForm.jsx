import React from 'react';
import axios from 'axios';

import { Form, Input, Button, InputNumber, Tooltip, message } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';


function validatePriority(priority) {
  if (0 < priority < 9) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'Приоритет должен быть от 0 до 9!',
  };
}

class CreateDeleteUpdateProjectForm extends React.Component {
  Auth = new AuthServiceLogic();


  state = {
    projects: [],
    defaultData: [],
    priority: 1,
  };


  componentWillReceiveProps(nextProps, nextContext) {
    console.log('--- received new props ---', nextProps);
    this.setState({
      defaultData: nextProps.defaultData,
    }, () => console.log('--- new state ---', this.state));

  }

  handlePriorityChange = (value) => {
    this.setState({
      priority: {
        ...validatePriority(value),
        value,
      }
    });
  };

  handleFormSubmit = (event, requestMethod) => {
    event.preventDefault();
    let projectID = this.props.projectID;
    const { updateProjects, closeModal } = this.props;
    console.log(this.props);
    const { title, description, entry, priority } = this.state;

    switch (requestMethod) {
      case 'post':
        return axios.post(`http://127.0.0.1:8000/api/projects/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': entry,
          'priority': priority.value,
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
          'priority': priority.value,
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
                   placeholder="Введите заголовок" />
            {/*TODO: при переходе на форму изменения проекта подставлять текущие данные каждого поля*/}
          </Form.Item>
          <Form.Item label="Описание">
            <CKEditor
              editor={ClassicEditor}
              data={initialDescription}
              onBlur={(event, editor) => {
                const data = editor.getData();
                this.setState({ description: data });
              }}
            />
          </Form.Item>
          <Form.Item label="Артикул">
            <Input name="entry" placeholder="Введите артикул"/>
          </Form.Item>
          <Form.Item
            label="Приоритет"
            validateStatus={priority.validateStatus}
          >
            <Tooltip placement='right' title={tips}>
              <InputNumber
                min={1}
                max={9}
                defaultValue=""
                value={priority.value}
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


  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  };


}

export default CreateDeleteUpdateProjectForm;
