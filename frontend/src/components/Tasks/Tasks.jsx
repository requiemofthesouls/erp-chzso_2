import React from 'react';
import { PageHeader, Popconfirm, Table, Tooltip } from 'antd/lib/index';
import Highlighter from 'react-highlight-words';
import { Button, Icon, Input, message } from 'antd';
import axios from 'axios';
import AuthServiceLogic from '../AuthService/AuthServiceLogic';

class Tasks extends React.Component {

  Auth = new AuthServiceLogic();

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      data: nextProps.tasks
    });
  }

  state = {
    data: this.props.tasks,
    selectedRowKeys: [],
    searchText: '',
    loading: false,
  };


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
                       setSelectedKeys, selectedKeys, confirm, clearFilters,
                     }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{
            width: 188,
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{
            width: 90,
            marginRight: 8
          }}
        >
          Найти
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Сброс
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>,
    onFilter: (value, record) => record[dataIndex].toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0
        }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  updateTasks = () => {
    axios.get(`http://127.0.0.1:8000/api/tasks/`, {
      headers: this.Auth.auth_header
    })
      .then(res => {
        this.setState({ data: res.data });
      });
  };

  handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      headers: this.Auth.auth_header
    });
  };

  handleDeleteSelected = (e) => {
    this.setState({ loading: true });
    const deleteIDs = this.state.selectedRowKeys;
    for (let id of deleteIDs) {
      this.handleDelete(id);
    }
    setTimeout(() => {
      this.updateTasks();
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
      message.success('Успешно');
    }, 1000);
  };


  render() {
    const { selectedRowKeys, data, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    };

    const columns = [
      {
        title: 'Название',
        dataIndex: 'title',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'Проект',
        dataIndex: 'project_title',
        ...this.getColumnSearchProps('project_title'),
      },
      {
        title: 'Статус',
        dataIndex: 'status_translate',
        width: '10%',
        sorter: true,
      },
      {
        title: 'Назначено на',
        dataIndex: 'assigned_on_username',
      },
      {
        title: 'Выполнить до',
        dataIndex: 'due_formatted',
      },
    ];

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <PageHeader
          onBack={() => this.props.history.goBack()}
          title="Задачи"
          subTitle="Список задач предприятия"
          extra={
            [
              <Tooltip title="Создать новую задачу">
                <Button
                  onClick={this.props.showModal}
                  icon="folder-add"
                  style={{ marginBottom: 10 }}
                >
                  Новая
                </Button>
              </Tooltip>,

              <Popconfirm
                placement={'bottomLeft'}
                title="Вы уверены что хотите удалить выбранные задачи?"
                onConfirm={this.handleDeleteSelected}
                okText="Да"
                cancelText="Нет"
              >

                <Tooltip title="Удалить выбранные задачи">
                  <Button
                    icon="delete"
                    style={{
                      marginBottom: 10,
                      marginLeft: 10
                    }}
                    disabled={!hasSelected}
                    loading={loading}
                    hidden={!hasSelected}
                  >
                    Удалить
                  </Button>
                </Tooltip>
              </Popconfirm>,
            ]
          }
        >
        </PageHeader>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey="id"
          onChange={this.onChange}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true
          }}
          bordered={true}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.props.history.push(`/tasks/${record.id}`);
              },
              onDoubleClick: (event) => {
              }, // double click row
              onContextMenu: (event) => {
              },  // right button click row
              onMouseEnter: (event) => {
              },   // mouse enter row
              onMouseLeave: (event) => {
              }   // mouse leave row
            };
          }}/>
      </div>
    );
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };
}


export default Tasks;
