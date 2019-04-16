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
  {
    title: 'old ID',
    dataIndex: 'old_id'
  }];


// routeChange(rowIndex) {
//     let path = `newPath`;
//     this.props.history.push(path);
//   }


class Projects extends React.Component {

  componentWillReceiveProps(nextProps, nextContent) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  state = {
    data: this.props.data
  };

  render() {

    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        rowKey="id"
        onChange={this.onChange}
        pagination={{ pageSize: 10 }}
        bordered={true}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // this.routeChange(rowIndex);
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


export default withRouter(Projects);
