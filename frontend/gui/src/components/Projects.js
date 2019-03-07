import React from 'react';
import {Table} from 'antd';

const columns = [
    {title: 'Title', dataIndex: 'title'},
    {title: 'Manager', dataIndex: 'manager'},
    {title: 'Priority', dataIndex: 'priority'},
    {title: 'old ID', dataIndex: 'old_id'}];

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}

// routeChange(rowIndex) {
//     let path = `newPath`;
//     this.props.history.push(path);
//   }

const Projects = (props) => {
    return (
        <Table
            columns={columns}
            dataSource={props.data}
            rowKey="id"
            onChange={onChange}
            pagination={{pageSize: 10}}
            bordered={true}
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                        // this.routeChange(rowIndex);
                        // this.props.history.push(`/projects/${rowIndex}`);
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
export default Projects;