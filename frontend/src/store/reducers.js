import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { projectsReducer } from './projects/reducers';

export default combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});


