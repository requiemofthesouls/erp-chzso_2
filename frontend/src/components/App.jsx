import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './Routes';
import 'antd/dist/antd.less';
import '../public/css/App.css';
import RootLayout from './Layout';


class App extends React.Component {

  render() {
    const {
      username,
      setGlobalUsername,
      projects,
      setProjects,
      tasks,
      setTasks
    } = this.props;

    return (
      <div className="App">
        <Router>
          <RootLayout
            username={username}
            setGlobalUsername={setGlobalUsername}
            projects={projects}
            setProjects={setProjects}
            tasks={tasks}
            setTasks={setTasks}
          >
            <BaseRouter/>
          </RootLayout>
        </Router>
      </div>
    );
  }
}

export default App;

