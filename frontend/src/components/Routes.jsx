import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginFormContainer from '../containers/AuthService/Login';
import RegistrationFormContainer from '../containers/AuthService/Signup';
import ProjectListContainer from '../containers/Projects/ProjectListView';
import ProjectDetailContainer from '../containers/Projects/ProjectDetailView';
import TaskListContainer from '../containers/Tasks/TasksListView';
import TaskDetailContainer from '../containers/Tasks/TasksDetailView';
import UserListView from './Users/UserListView';
import UserSearchView from './Users/UserSearchView'
import UserDetailContainer from '../containers/Users/UserDetailContainer';
import Err404 from './404';


const BaseRouter = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/login' component={LoginFormContainer}/>
        <Route exact path='/signup' component={RegistrationFormContainer}/>

        <Route exact path='/projects' component={ProjectListContainer}/>
        <Route exact path='/projects/:projectID' component={ProjectDetailContainer}/>

        <Route exact path='/tasks' component={TaskListContainer}/>
        <Route exact path='/tasks/:taskID' component={TaskDetailContainer}/>

        <Route exact path='/users' component={UserListView}/>
        <Route exact path='/users/search' component={UserSearchView}/>
        <Route exact path='/users/:userID' component={UserDetailContainer}/>


        <Route exact path='/404' component={Err404}/>

        <Redirect from='*' to='/404'/>

      </Switch>
    </div>
  );
};


export default BaseRouter;


