import React from 'react';
import axios from 'axios';
import {Form, Input, Button,} from 'antd';

class CustomForm extends React.Component {

  handleFormSubmit = (event, requestMethod, projectID) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;

    switch (requestMethod) {
      case 'post':
        return axios.post('http://127.0.0.1:8000/api/projects/', {
          "title": title,
          "active": true,
          "description": description,
          "entry": "fasgfa",
          "priority": 2,
          "old_id": 0
        })
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/projects/${projectID}/`, {
          "title": title,
          "active": true,
          "description": description,
          "entry": "fasgfa",
          "priority": 2,
          "old_id": 0
        })
          .catch(err => console.error(err));
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(event,
          this.props.requestMethod,
          this.props.projectID)}>
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