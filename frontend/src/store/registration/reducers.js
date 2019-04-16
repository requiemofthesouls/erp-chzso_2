import { REGISTRATION_CHANGE_USERNAME_TEXT } from './actions';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';

const Auth = new AuthServiceLogic();

const defaultState = {
  email:'',
  username: Auth.loggedIn() ? Auth.getProfile().username : '',
};


export const registrationReducer = (state = defaultState, action) => {
    console.log('--- reducer`s state',state);
  switch (action.type) {
    case REGISTRATION_CHANGE_USERNAME_TEXT:
      return {
        ...state,
        username: action.payload
      };
  }

  return state;
};


