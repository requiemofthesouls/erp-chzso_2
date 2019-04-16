import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProjectDetail from './Projects/ProjectDetailView';
import LoginFormContainer from '../containers/AuthService/Login';
import RegistrationFormContainer from '../containers/AuthService/Signup';
import ProjectListContainer from '../containers/Projects/ProjectListView';


const BaseRouter = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/login' component={LoginFormContainer}/>
        <Route exact path='/signup' component={RegistrationFormContainer}/>

        <Route exact path='/projects' component={ProjectListContainer}/>
        <Route exact path='/projects/:projectID' component={ProjectDetail}/>


        <Redirect from='*' to='/'/>

      </Switch>
    </div>
  );
};


export default BaseRouter;


