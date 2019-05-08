import React from 'react';
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ru'
import locale from 'antd/lib/date-picker/locale/ru_RU';

import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Tooltip,
  Checkbox,
  Radio,
  Switch,
  DatePicker
} from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

const emptyTask = {
  'title': '',
  'active': '',
  'slug': '',
  'project': '',
  'description': '',
  'priority': 1,
  'status': '',
  'assigned_on': '',
  'time_start': '',
  'time_due': '',
  'time_required': '',
  'time_spent': '',
};

let emptyUserlist = [{
  'id': '',
  'username': ''
}];

class CreateDeleteUpdateTaskForm extends React.Component {
  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);

    this.state = {
      userlist: this.props.userlist ? this.props.userlist : emptyUserlist,
      projectList: this.props.projects ? this.props.projects : [],
      new_manager: null,
      defaultData: this.props.current_task ? this.props.current_task : emptyTask,
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
      projectList: nextProps.projects ? nextProps.projects : [],
      defaultData: nextProps.current_task ? nextProps.current_task : emptyTask,
    }, () => console.log('--- new state ---', this.state));

  }


  handleFormSubmit = (event, requestMethod) => {
    event.preventDefault();
    const taskID = this.props.taskID;
    const {updateTasks, closeModal} = this.props;
    const {
      title,
      active,
      status,
      assigned_on_id,
      assigned_on_username,
      description,
      start,
      due,
      time_required,
      time_spent,
      id,
      priority,
      project,
      project_id,
      project_title,
    } = this.state.defaultData;

    console.log('--- PUT ---', this.state.defaultData);

    switch (requestMethod) {
      case 'post':
        return axios.post(`http://127.0.0.1:8000/api/tasks/`, {
          'title': title,
          'active': active,
          'project': project,
          'description': description,
          'priority': priority,
          'status': status,
          'assigned_on_id': assigned_on_id,
          'start': start,
          'due': due,
          'time_required': time_required,
          'time_spent': time_spent,
        }, {
          headers: this.Auth.auth_header
        })
          .then((res) => {
            closeModal();
            message.success(`Проект ${title} добавлен`, 2.5);
            updateTasks();
          })
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/tasks/${taskID}/`, {
          'title': title,
          'active': active,
          'description': description,
          'project': project,
          'priority': priority,
          'status': status,
          'assigned_on_id': assigned_on_id,
          'start': start,
          'due': due,
          'time_required': time_required,
          'time_spent': time_spent,
        }, {
          headers: this.Auth.auth_header
        })
          .then((res) => {
            message.success(`Проект ${title} обновлён`, 2.5);
            this.props.history.push('/tasks');
            updateTasks();
          })
          .catch(err => console.error(err));
    }
  };

  componentDidMount() {
    console.log('current state after render ---', this.state);
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 12},
    };

    const RangePicker = DatePicker.RangePicker;
    const {defaultData} = this.state;
    const tips = <span>от 1 до 9</span>;

    const today = new Date();
    const last_modified = new Date(defaultData.last_modified);

    const users = this.state.userlist.map((user) =>
      <Option value={user.id.toString()}>{user.username}</Option>
    );

    const projects = this.state.projectList.map((project) =>
      <Option value={project.id.toString()}>{project.title}</Option>
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

          <Form.Item label="Активная">
            <Switch defaultChecked={defaultData.active} onChange={this.handleActiveChange}/>
          </Form.Item>

          <Form.Item label="Проект">
            <Select
              name="project"
              mode="single"
              placeholder="Выберите проект."
              defaultValue={defaultData.project_title}
              onChange={this.handleProjectChange}
            >
              {projects}
            </Select>
          </Form.Item>

          <Form.Item label="Назначено на">
            <Select
              name="manager"
              mode="single"
              placeholder="Выберите ответственного."
              defaultValue={defaultData.assigned_on_username}
              onChange={this.handleManagerChange}
            >
              {users}
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

          <Form.Item label="Статус">
            <div>
              <Radio.Group name="status" defaultValue="new" buttonStyle="solid">
                <Radio.Button value="new">Новая</Radio.Button>
                <Radio.Button value="current">Текущая</Radio.Button>
                <Radio.Button value="suspend">Заморожена</Radio.Button>
                <Radio.Button value="done">Завершена</Radio.Button>
                <Radio.Button value="cancel">Отменена</Radio.Button>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item label='Время начала и окончания'>
            <RangePicker
              locale={locale}
              defaultValue={[moment(), moment()]}
              ranges={{
                "Сегодня": [moment(), moment()],
                "Этот месяц": [moment().startOf('month'), moment().endOf('month')]
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={this.handleDateRangeChange}
            />
          </Form.Item>

          <Form.Item label="Требуется времени">
            <InputNumber
              min={0}
              name="time_required"
              defaultValue={defaultData.time_required}
              onChange={this.handleTimeRequiredChange}
            />
          </Form.Item>

          <Form.Item label="Времени затрачено">
            <InputNumber
              min={0}
              name="time_spent"
              defaultValue={defaultData.time_spent}
              onChange={this.handleTimeSpentChange}
            />
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
    this.state.defaultData.assigned_on_id = value;
  };

  handleProjectChange = (value) => {
    this.state.defaultData.project = value;
  };

  handlePriorityChange = (value) => {
    this.state.defaultData.priority = value;
  };

  handleChange = (e) => {
    this.state.defaultData[e.target.name] = e.target.value;
    console.log(this.state.defaultData)
  };

  handleActiveChange = () => {
    this.state.defaultData.active = !this.state.defaultData.active
  };

  handleDateRangeChange = (moment, date) => {
    this.state.defaultData.start = moment[0].format();
    this.state.defaultData.due = moment[1].format();
  };

  handleTimeRequiredChange = (value) => {
    this.state.defaultData.time_required = value;
  };

  handleTimeSpentChange = (value) => {
    this.state.defaultData.time_spent = value;
  }

}

export default CreateDeleteUpdateTaskForm;
