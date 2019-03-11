import React from 'react';
import { Route } from 'react-router-dom';
import ProjectList from './containers/ProjectListView';
import ProjectDetail from './containers/ProjectDetailView';

const BaseRouter = () => (
  <div>
    <Route exact path='/projects' component={ ProjectList }/>
    <Route exact path='/projects/:projectID' component={ ProjectDetail }/>
  </div>
);

export default BaseRouter;
