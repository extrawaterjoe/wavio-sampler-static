// import types
import { HELP_MESSAGE } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type){
    case HELP_MESSAGE:
      return {
        ...state,
        msg: action.payload
      }
      
    default:
    return state;
  };
};