import React from 'react';
import { Mentions, Select } from 'antd';
import axios from 'axios';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';


export default class UserSearchView extends React.Component {
  Auth = new AuthServiceLogic();

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: true,
      users: [],
    };

    this.getUsers();
  }

  getUsers = () => {
    axios.get(`http://127.0.0.1:8000/api/users/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({
          users: res.data,
          loading: false
        });
      });
  };

  render() {
    const { Option } = Select;
    const { loading, users } = this.state;


    return (
      <Select
        onSelect={(id) => this.props.history.push(`users/${id}`)}
        loading={loading}
        showSearch
        style={{ width: 300}}
        placeholder="Поиск"
        optionFilterProp="children"
      >

        {users.map((user) => (
          <Option value={user.id}>
            <img
              style={{
                width: '30px',
                marginRight: '10px'
              }}
              src={user.avatar}
              alt={'avatar'}
            />
            {user.username}
          </Option>
        ))}

      </Select>
    );
  }


}
