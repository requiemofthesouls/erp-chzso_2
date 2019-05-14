import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginFormContainer from '../containers/AuthService/Login';
import RegistrationFormContainer from '../containers/AuthService/Signup';
import ProjectListContainer from '../containers/Projects/ProjectListView';
import ProjectDetailContainer from '../containers/Projects/ProjectDetailView';
import TaskListContainer from '../containers/Tasks/TasksListView';
import TaskDetailContainer from '../containers/Tasks/TasksDetailView';
import UserListView from "./Users/UserListView";
import UserDetailContainer from "../containers/Users/UserDetailContainer";


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
        <Route exact path='/users/:userID' component={UserDetailContainer}/>


        <Redirect from='*' to='/'/>

      </Switch>
    </div>
  );
};


export default BaseRouter;


