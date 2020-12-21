// import types
import { 
  ADDTO_LOOPBANK,
  REMOVEFROM_LOOPBANK,
  CALLUP_LOOP,
  ADDTO_SEQUENCE,
  CLEAR_SEQUENCE
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type){
    case ADDTO_LOOPBANK:
      return {
        ...state,
        loopBank: [...state.loopBank, action.payload]
      };

    case REMOVEFROM_LOOPBANK:
      return {
        ...state,
        loopBank: state.loopBank.filter(loop => loop.id !== action.payload)
      };

    case CALLUP_LOOP:
      return {
        ...state,
        calledUpLoop: state.loopBank.filter(loop => loop.id === action.payload)
      };
    
    case ADDTO_SEQUENCE:
      return {
        ...state,
        sequenceBank: [...state.sequenceBank, action.payload]
      }

    case CLEAR_SEQUENCE:
      return {
        ...state,
        sequenceBank: []
      };

    default:
      return state;
  };
};