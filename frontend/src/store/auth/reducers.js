import { SET_GLOBAL_USERNAME } from './actions';
import AuthServiceLogic from '../../components/AuthService/AuthServiceLogic';

const Auth = new AuthServiceLogic();

const defaultState = {
  username: Auth.loggedIn() ? Auth.getProfile().username : '',
};


export const authReducer = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {
    case SET_GLOBAL_USERNAME:
      return {
        ...state,
        username: action.payload
      };
  }

  return state;
};


