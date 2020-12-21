import { useState, useContext } from 'react';
import SampleContext from '../../context/sample/sampleContext';
import HelpContext from '../../context/help/helpContext';
//
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { TitleContainer } from '../../css/TitleContainer';
//
import RegionCreator from '../kitUtils/RegionCreator';
import RegionHover from '../kitUtils/RegionHover';
import RegionClick from '../kitUtils/RegionClick';
//
import {ReactComponent as UploadIcon} from '../../css/icons/upload.svg'

const SampleControlContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 14;
  grid-column-end: 17;
  min-height: 285px;
  margin-top: 2rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
`

const blink = keyframes`
  0% {
    fill: white;
    margin-right: 1px;
    height: 0.8rem; 
    width: 0.8rem;
  }

  50% {
    fill: red;
    margin-right: 0px;
    height: 0.9rem; 
    width: 0.9rem;
  }

  100% {
    fill: white;
    margin-right: 1px;
    height: 0.8rem; 
    width: 0.8rem;
  }
`

const NotUploadedIcon = styled(UploadIcon)`
  animation: ${blink} 1s ease infinite;
`

const UploadedIcon = styled(UploadIcon)`
  height:0.9rem; 
  width: 0.9rem;
  fill: green;
`

const RemoveAllRegionsButton = styled.button`
  display: flex;
  height: 18px;
  width: 95%;
  margin: 4px 5px;
  padding: 2px;
  padding-bottom: 5px;
  font-family: inherit;
  font-size: 11px;
  place-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  border: none;
  border-radius: 0.25em;
  transition: all 250ms ease 0s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const SampleControl = () => {
  const sampleContext = useContext(SampleContext);
  const { loadedKit, removeAllRegions } = sampleContext;

  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext;

  return (
    <SampleControlContainer>
      <TitleContainer>
        <span>Options</span>
      </TitleContainer>
        <>
        <RegionCreator />
        <RemoveAllRegionsButton onClick={removeAllRegions}>Remove All Regions</RemoveAllRegionsButton>
        <RegionHover />
        <RegionClick />
        </>
    </SampleControlContainer>
  );
};

export default SampleControl;
