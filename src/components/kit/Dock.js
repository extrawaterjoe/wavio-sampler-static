import React, { memo, useContext } from 'react';
import HelpContext from '../../context/help/helpContext';

import styled from 'styled-components';
import { TitleContainer } from '../../css/TitleContainer';

const DockContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 6;
  grid-column-start: 1;
  grid-column-end: 4;
  min-height: 95%;
  background-color: ${({ theme }) => theme.secondary};
  margin-top: 2rem;
  border-radius: 6px;
`

const Header = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.nav};
  margin: 3px;
  padding: 3px;
  justify-content: center;
  border-radius: 0.25em;
  & > svg {
    margin: 3px 5px;
    height:0.8rem; 
    width: 0.8rem;
    fill: white;
  }
`

const ShortcutsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  height: 60%;
  margin: 4px;
  border-radius: 0.25em;
  overflow: scroll;
  & > span {
    margin: 5px;
    font-size: 10px;
  }
`

const HelpContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.nav};
  color: ${({ theme }) => theme.text};
  height: 33%;
  margin: 4px;
  padding: 5px;
  font-size: 11px;
  border-radius: 0.25em;
`

const Dock = memo(() => {
  const helpContext = useContext(HelpContext);
  const { msg } = helpContext;

  return (
    <DockContainer>
      <TitleContainer>Help</TitleContainer>
      <ShortcutsContainer>
        <Header>Keyboard Shortcuts</Header>
          <span></span>
          <span>Play/Pause Sample : Spacebar</span>
          <span>Toggle Record : r</span>
          <span>Add Region : Shift + =</span>
          <span>Remove All Regions : Shift + delete</span>
          <span></span>
          <span>Play/Pause Clip : a</span>
          <span>Edit Clip : e</span>
          <span>Capture Clip : c</span>
      </ShortcutsContainer>
      <HelpContainer>
        <span>{msg}</span>
      </HelpContainer>
    </DockContainer>
  )
});

export default Dock;
