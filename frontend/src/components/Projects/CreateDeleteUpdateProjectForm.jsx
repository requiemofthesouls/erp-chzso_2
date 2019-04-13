import React from 'react';
import axios from 'axios/index';

import { Form, Input, Button, Modal, Radio, } from 'antd/lib/index';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

class CreateDeleteUpdateProjectForm extends React.Component {
  Auth = new AuthServiceLogic();


  state = {
    projects: [],
    defaultData: [],
  };


  handleFormSubmit = (event, requestMethod) => {
    event.preventDefault();
    let title = event.target.elements.title.value;
    let description = event.target.elements.description.value;
    let projectID = this.props.projectID;

    switch (requestMethod) {
      case 'post':
        return axios.post(`http://127.0.0.1:8000/api/projects/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': 'fasgfa',
          'priority': 2,
          'old_id': 0
        }, {
          headers: this.Auth.auth_header
        })
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
          'title': title,
          'active': true,
          'description': description,
          'entry': 'fasgfa',
          'priority': 2,
          'old_id': 0
        }, {
          headers: this.Auth.auth_header
        })
          .catch(err => console.error(err));
    }
  };

  render(){
    return (
      <div>
        <Form onChange={this.handleChange} onSubmit={(e) => this.handleFormSubmit(e, this.props.requestMethod)}>
          <Form.Item label="Название">
            <Input name="title" placeholder="Введите название" /> {/*TODO: почему не передается свойство defaultData*/}
          </Form.Item>
          <Form.Item label="Описание">
            <Input name="description" placeholder="Введите описание"/>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  handleChange = () => {
    // console.log(this.props)
  }
}

export default CreateDeleteUpdateProjectForm;
