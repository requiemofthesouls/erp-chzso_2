import React from 'react';
import { Table } from 'antd/lib/index';
import { withRouter } from 'react-router-dom';

const columns = [
  {
    title: 'Название',
    dataIndex: 'title'
  },
  {
    title: 'Ответственный',
    dataIndex: 'manager_username'
  },
  {
    title: 'Приоритет',
    dataIndex: 'priority'
  },
];


class Projects extends React.Component {

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('received newprops', nextProps);
    this.setState({
      data: nextProps.projects
    });
  }

  state = {
    data: this.props.projects,
    selectedRowKeys: [],
  };


  onSelectChange = (selectedRowKeys) => {
    console.log(this.state)
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    };

    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.state.data}
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
              this.props.history.push(`/projects/${record.id}`);
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
    );
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };
}


export default Projects;
