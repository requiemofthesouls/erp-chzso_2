import { LOGIN_CHANGE_USERNAME_TEXT } from './actions';

const defaultState = {
  username: '',
};


export const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_CHANGE_USERNAME_TEXT:
      return {
        ...state,
        username: action.payload
      };
  }

  return state;
};
