import React, { memo } from 'react';
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

const SavedRegionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  height: 33%;
  margin: 4px;
  border-radius: 0.25em;
  overflow: scroll;
`

const BrowseKitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  height: 33%;
  margin: 4px;
  border-radius: 0.25em;
  overflow: scroll;
`

const DockRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 3px;
  margin: 4px;
  background-color: ${({ theme }) => theme.nav};
  font-size: 11px;
  border-radius: 0.25em;
  transition: all 250ms ease 0s;
  & > svg {
    margin: 3px 5px;
    height:0.8rem; 
    width: 0.8rem;
    fill: white;
  }
  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const HelpContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.nav};
  color: ${({ theme }) => theme.text};
  height: 26%;
  margin: 4px;
  padding: 5px;
  font-size: 11px;
  border-radius: 0.25em;
`

const Dock = memo(() => {

  return (
    <DockContainer>
      <TitleContainer>Social</TitleContainer>
      <SavedRegionsContainer>
        <Header>Saved Regions</Header>
        
      </SavedRegionsContainer>
      <BrowseKitsContainer>
        <Header>Kits</Header>
        
      </BrowseKitsContainer>
      <HelpContainer>

      </HelpContainer>
    </DockContainer>
  )
});

export default Dock;
