import React from 'react';
import { Timeline } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';


export default class LogListView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { data } = this.props;

    return (
      <Timeline>
        {data.map((item) => (
          <Timeline.Item>
            <span>
              {item.requestUser} <br/>
              {item.requestMethod} <br/>
              {item.requestAddress} <br/>
              {moment(item.created_at).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }
}
