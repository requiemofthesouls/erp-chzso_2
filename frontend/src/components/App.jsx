import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import '../public/css/App.css';
import RootLayout from './Layout';
import withAuth from './withAuth';
import LoginForm from './Login';

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
