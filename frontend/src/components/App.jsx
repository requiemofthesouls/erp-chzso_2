import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import BaseRouter from './Routes';
import 'antd/dist/antd.css';
import '../public/css/App.css';
import RootLayout from './Layout';
import authServiceWrapper from './AuthService/AuthServiceWrapper';
import LoginForm from './AuthService/Login';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <Router>
          <RootLayout >
            <BaseRouter/>
          </RootLayout>
        </Router>
      </div>
    );
  }
}

export default App;
