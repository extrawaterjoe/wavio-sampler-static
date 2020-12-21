import { useContext } from 'react';
import LoopContext from '../../context/loop/loopContext';
import HelpContext from '../../context/help/helpContext';

import {ReactComponent as CallUpIcon} from '../../css/icons/leftarrow.svg'
import {ReactComponent as SequenceIcon} from '../../css/icons/plus-sign.svg'
import {ReactComponent as XIcon} from '../../css/icons/x.svg'
import {ReactComponent as SquareIcon} from '../../css/icons/square.svg'
import styled from 'styled-components';

const LoopBankContainer= styled.div`
display: flex;
flex-direction: column;
min-height: 16em;
max-height: 16em;
overflow-x: hidden;
overflow-y: scroll;
background-color: ${({ theme }) => theme.nav};
padding: 0.4em;
margin: 0.5em;
border-radius: 0.25em;
` 

const LoopRow = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.body};
  font-size: 10px;
  max-height: 1.5em;
  min-height: 1.5em;
  width: auto;
  margin: 2px 3px;
  padding: 1px 2px;
  justify-content: space-between;
  border-radius: 0.25em;
`

const IconContainer = styled.div`
  margin-right: 5px;
  transition: all 250ms ease 0s;
  & > svg {
    margin: 1px 4px;
    height:0.7rem; 
    width: 0.7rem;
    fill: white;
  }
  & #call-loop:hover{
    fill: #fff899;
  }
  & #sequence-loop:hover {
    fill: #59ffaf;
  }
  & #remove-loop:hover {
    fill: #ff5959;
  }
`

const SequenceStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(8px, 1fr));
  grid-template-rows: repeat(2, minmax(13px, auto));
  grid-gap: 1px;
  background-color: ${({ theme }) => theme.body};
  margin-top: auto;
  place-items: center;
  width: 100%;
  border-radius: 0.25em;
  & > svg {
    margin: 2px 0px;
    height:10px; 
    width: 12px;
    fill: pink;
  }
`

const ClearSequenceButton = styled.button`
  display: flex;
  font-family: inherit;
  font-size: 12px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  margin: 10px auto;
  width: 80%;
  justify-content: center;
  vertical-align:middle;
  border: none;
  border-radius: 0.25em;
  transition: all 250ms ease 0s;
  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
    color: #ff7895;
  }
`

const LoopBank = () => {
  const loopContext = useContext(LoopContext);
  const { 
    loopBank, 
    removeFromLoopBank, 
    callUpLoop, 
    sequenceBank,
    setToSequence, 
    clearSequence 
  } = loopContext;

  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext;

  return (
    <>
      <LoopBankContainer>
        <>
          {loopBank.map(loop => 
            <LoopRow 
            key={loop.id} 
            >
              <span>Clip: {loop.id}</span> 
              <IconContainer>
                <CallUpIcon 
                id="call-loop" 
                onClick={() => callUpLoop(loop.id)} 
                onMouseOver={() => setMsg("loadClip")}
                onMouseOut={() => setMsg("clear")}
                />
                <SequenceIcon 
                id="sequence-loop" 
                onClick={() => setToSequence(loop.id)}
                onMouseOver={() => setMsg("sequenceClip")}
                onMouseOut={() => setMsg("clear")} 
                />
                <XIcon 
                id="remove-loop" 
                onClick={() => removeFromLoopBank(loop.id)}
                onMouseOver={() => setMsg("removeClip")}
                onMouseOut={() => setMsg("clear")}
                />
              </IconContainer>
            </LoopRow>
          )}
        </>
        <SequenceStatus>
          {sequenceBank.map((l, idx) => 
            <SquareIcon key={idx}/>
          )}
        </SequenceStatus>
      </LoopBankContainer>
    <ClearSequenceButton 
    onClick={clearSequence}
    onMouseOver={() => setMsg("clearSequence")}
    onMouseOut={() => setMsg("clear")}
    >
      <span>Clear Sequence</span>
    </ClearSequenceButton>
    </>
  );
};

export default LoopBank;
