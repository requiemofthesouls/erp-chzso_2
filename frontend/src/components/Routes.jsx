import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ProjectList from './Projects/ProjectListView';
import ProjectDetail from './Projects/ProjectDetailView';
import LoginForm from './AuthService/Login';
import SignupForm from './AuthService/Signup';


const BaseRouter = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/login' component={LoginForm}/>
        {/*<Route exact path='/logout'/> /* TODO: handleLogout */}

        <Route exact path='/signup' component={SignupForm}/>

        <Route exact path='/projects' component={ProjectList}/>
        <Route exact path='/projects/:projectID' component={ProjectDetail}/>


        <Redirect from='*' to='/'/>

      </Switch>
    </div>
  );
};


export default BaseRouter;


