import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import '../assets/css/App.css';
import RootLayout from '../containers/Layout';
import withAuth from './withAuth';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <Router>
          <RootLayout>
            <BaseRouter/>
          </RootLayout>
        </Router>
      </div>
    );
  }
}

export default App;
