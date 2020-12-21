// import types
import { 
  SET_LOOPBLOB
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type){
    case SET_LOOPBLOB:
      return {
        ...state,
        loopBlob: action.payload
      };

      default:
      return state;
  };
};