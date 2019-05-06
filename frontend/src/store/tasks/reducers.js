import { SET_TASKS } from './actions';


const defaultState = {
  data: [],
};


export const tasksReducer = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {

    case SET_TASKS:
      return {
        ...state,
        data: action.payload
      };

  }

  return state;
};

