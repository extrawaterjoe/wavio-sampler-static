import { useContext } from 'react';
import SampleContext from '../../context/sample/sampleContext';
import HelpContext from '../../context/help/helpContext';

import {ReactComponent as AddIcon} from '../../css/icons/plus-sign.svg'
import styled from 'styled-components';

const RegionAddContainer = styled.div`
  margin: 7px 10px;
  display: flex;
  place-items: center;
  justify-content: space-between;
  transition: all 250ms ease 0s;
  & > svg {
    margin: 0rem 0.2rem;
    height:0.8rem; 
    width: 0.8rem;
    fill: white;
  }
  & > svg:hover {
    fill: lightgreen;
  }
`

const RegionCreator = () => {
  const sampleContext = useContext(SampleContext);
  const { sampleBlob, loadedKit, addRegion, sampleRegions } = sampleContext;

  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext;

  const onClick = () => {
    if(!sampleBlob && !loadedKit) { return; };
    if(sampleRegions.length === 8) { return; }; 
    addRegion();
  };

  return (
    <RegionAddContainer>
      <span>Add Region:</span>
      <AddIcon 
      onClick={onClick}
      onMouseOver={() => setMsg("addRegion")}
      onMouseOut={() => setMsg("clear")}
      />
    </RegionAddContainer>
  )
}

export default RegionCreator
