import { useReducer } from 'react';
import { helpMessages } from './helpMessages';
import HelpContext from './helpContext';
import helpReducer from './helpReducer';
// import types
import { HELP_MESSAGE } from '../types';

const HelpState = props => {
  const initialState = {
    msg: null
  };

  const [state, dispatch] = useReducer(helpReducer, initialState);

  // actions
  const setMsg = msg => {
    dispatch({ 
      type: HELP_MESSAGE, 
      payload: helpMessages[`${msg}`] 
    });
  };

  return (
    <HelpContext.Provider
    value={{
      msg: state.msg,
      setMsg
    }}
    >
      {props.children}
    </HelpContext.Provider>
  );
};

export default HelpState;
