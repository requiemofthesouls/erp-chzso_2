import React from 'react';
import { Button, Collapse, Descriptions, PageHeader, Popconfirm, Timeline, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';


export default class LogListView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <PageHeader
          onBack={() => this.props.history.goBack()}
          title="Логи операций"
          subTitle="Журнал изменений в системе"
          extra={
            []
          }
        >
        </PageHeader>


        {data.map((item) => (
          <div style={{ marginBottom: '20px' }}>
            <Descriptions bordered size={'small'}>
              <Descriptions.Item label="Имя пользователя">{item.username}</Descriptions.Item>
              <Descriptions.Item label="HTTP Метод">{item.requestMethod}</Descriptions.Item>
              <Descriptions.Item label="IP">{item.requestAddress}</Descriptions.Item>
              <Descriptions.Item label="Время">
                {moment(item.created_at)
                  .format('YYYY/MM/DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="URL">{item.requestPath}</Descriptions.Item>

              <Descriptions.Item label="Тело запроса">
                <Collapse>
                  <Collapse.Panel>
                    {item.requestBody}
                  </Collapse.Panel>
                </Collapse>
              </Descriptions.Item>

            </Descriptions>
          </div>
        ))}

      </div>
    );
  }
}


