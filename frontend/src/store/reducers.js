import { combineReducers } from 'redux';
import { loginReducer } from './auth/reducers';
import { registrationReducer } from './registration/reducers';

export default combineReducers({
  auth: loginReducer,
  registration: registrationReducer
});


