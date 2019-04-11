import React from 'react';
import axios from 'axios';

import HOST_ADDR from '../CONSTANTS';
import { Form, Input, Button, Modal, Radio, } from 'antd';
import AuthService from './AuthService';

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.auth_header = { 'Authorization': `JWT ${this.Auth.getToken()}` };
    this.state = {
      projects: [],
    };
  }


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
          headers: this.auth_header
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
          headers: this.auth_header
        })
          .catch(err => console.error(err));
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(event,
          this.props.requestMethod)}>
          <Form.Item label="Title">
            <Input name="title" placeholder="Put a title here"/>
          </Form.Item>
          <Form.Item label="Description">
            <Input name="description" placeholder="Put a description here"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
