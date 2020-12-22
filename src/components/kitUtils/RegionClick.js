import { useContext } from 'react';
import SampleContext from '../../context/sample/sampleContext';
import HelpContext from '../../context/help/helpContext';

import styled from 'styled-components';
import { RegionEditContainer } from '../../css/RegionEditContainer';
import {ReactComponent as CloseIcon} from '../../css/icons/close.svg';

const RowContainer = styled.div`
  margin: 4px 10px;
  display: flex;
  width: 100%;
  /* place-items: center; */
  justify-content: space-between;
  transition: all 250ms ease 0s;
  & > svg {
    margin: 0rem;
    margin-right: 10px;
    height:0.8rem; 
    width: 0.8rem;
    fill: white;
    &#clear-region :hover {
      fill: red;
    }
  }
`

const RemoveRegionButton = styled.button`
  font-family: inherit;
  font-size: 11px;
  height: 20px;
  margin: 0.1rem 6px;
  background-color: slategrey;
  border: none;
  border-radius: 0.25em;
  width: 90%;
  text-align: center;
  transition: all 250ms ease 0s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);;
  }
`

const RegionClick = () => {
  const sampleContext = useContext(SampleContext);
  const {
    clickedRegion, 
    clearClickedRegion, 
    removeSelectedRegion
  } = sampleContext;
  
  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext;

  if(!clickedRegion) {
    return <RegionEditContainer />
  };

  return (
    <RegionEditContainer>
      <RowContainer>
        <span>{clickedRegion ? `Region: [${clickedRegion.id}] ` : '...'}</span>
        <CloseIcon id="clear-region" onClick={clearClickedRegion}/>
      </RowContainer>
      <RowContainer>
        <RemoveRegionButton onClick={() => removeSelectedRegion(clickedRegion.id)}>
          <span>Remove</span>
        </RemoveRegionButton>
      </RowContainer>
    </RegionEditContainer>
  )
};

export default RegionClick;
