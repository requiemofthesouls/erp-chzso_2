import React from 'react';
import {Alert, Progress, message} from 'antd';


export default class Err404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
    this.startTimer()
  }


  startTimer = () => {
    setInterval(() => this.setState({percent: this.state.percent + 1},
      () => {this.state.percent > 100
        ? (message.success("Вы были перенаправлены.", 2), this.props.history.push('/'))
        : {}}), 50)
  };

  render() {

    return (
      <div>
        <Alert
          message="404"
          description="Страница не найдена. Вы будете перенаправлены на главную страницу."
          type="error"
          showIcon
          banner
        />

        <Progress percent={this.state.percent}/>

      </div>
    )
  }
}
