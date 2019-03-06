import React from 'react';
import {List, Icon} from 'antd';

const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

const Projects = (props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.priority}/>, <IconText type="like-o" text="156"/>,
            <IconText type="message" text="2"/>]}>
          <List.Item.Meta
            title={<a href={`projects/${item.id}`}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default Projects;