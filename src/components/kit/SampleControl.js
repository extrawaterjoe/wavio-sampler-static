import { useContext } from 'react';
import SampleContext from '../../context/sample/sampleContext';
//
import styled from 'styled-components';
import { TitleContainer } from '../../css/TitleContainer';
//
import RegionCreator from '../kitUtils/RegionCreator';
import RegionHover from '../kitUtils/RegionHover';
import RegionClick from '../kitUtils/RegionClick';

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
  const { removeAllRegions } = sampleContext;

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
