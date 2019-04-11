import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ProjectList from '../containers/ProjectListView';
import ProjectDetail from '../containers/ProjectDetailView';
import LoginForm from '../components/Login';
import SignupForm from '../components/Signup';


const BaseRouter = () => (

  <div>
    <Switch>
      <Route exact path='/login' component={LoginForm}/>

      <Route exact path='/signup' component={SignupForm}/>

      <Route exact path='/projects' component={ProjectList}>
        <Route exact path='/projects/:projectID' component={ProjectDetail}/>
      </Route>

      <Redirect from='*' to='/' />


    </Switch>
  </div>
);

export default BaseRouter;


