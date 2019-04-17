import { SET_PROJECTS } from './actions';


const defaultState = {
  data: [],
};


export const projectsReducer = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {

    case SET_PROJECTS:
      return {
        ...state,
        data: action.payload
      };

  }

  return state;
};


