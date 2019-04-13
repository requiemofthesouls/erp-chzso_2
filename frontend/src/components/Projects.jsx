import React from 'react';
import { Table } from 'antd';
import { withRouter } from 'react-router-dom';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Manager',
    dataIndex: 'manager'
  },
  {
    title: 'Priority',
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


  render() {

    return (
      <Table
        columns={columns}
        dataSource={this.props.data}
        rowKey="id"
        onChange={this.onChange}
        pagination={{ pageSize: 10 }}
        bordered={true}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // this.routeChange(rowIndex);
              this.props.history.push(`/projects/${rowIndex}`);
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
