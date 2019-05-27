import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { projectsReducer } from './projects/reducers';
import { tasksReducer } from './tasks/reducers';

export default combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});


