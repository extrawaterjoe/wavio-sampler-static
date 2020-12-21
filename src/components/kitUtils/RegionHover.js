import { useContext } from 'react';
import SampleContext from '../../context/sample/sampleContext';
import HelpContext from '../../context/help/helpContext';

import styled from 'styled-components';
import {ReactComponent as SquareIcon} from '../../css/icons/square.svg'

const RowContainer = styled.div`
  font-size: 0.7rem;
  display: flex;
  margin: 0em 0.5em;
  padding: 0em 0.5em;
  min-height: 1.5rem;
  max-width: 95%;
  min-width: 95%;
  place-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.nav};
  border-radius: 0.25em;
  & > svg {
    margin: 0rem 0.5rem;
    height:0.8rem; 
    width: 0.8rem;
  }
`

const StatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(1rem, 1fr));
  grid-template-rows: 1;
  margin: 0em 0.5em;
  padding: 0em 0.2em;
  min-height: 1.5rem;
  max-height: 1.5rem;
  max-width: 95%;
  min-width: 95%;
  place-items: center;
  background-color: ${({ theme }) => theme.nav};
  border-radius: 0.25em;
  & > svg {
    margin: 0rem 0.5rem;
    height:0.8rem; 
    width: 0.8rem;
  }
`

const RegionBlock = styled.div`
  display: flex;
  grid-row-start: 1;
  min-height: 1rem;
  font-size: 0.5rem;
  width: 1rem;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`

const RegionHover = () => {
  const sampleContext = useContext(SampleContext);
  const { hoveredRegion, sampleRegions } = sampleContext;

  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext;

  let regionArr = [];

  const regionSpaceDisplay = (sampleRegions) => {
    if(sampleRegions.length === 0) { return; };

    for (let i = 0; i < 8; i++) {
      if (!sampleRegions[i]) {
        regionArr.push('x')
      } else {
        regionArr.splice(i, 0, sampleRegions[i]);
      } 
    };
    return regionArr;
  };
  
  if(!hoveredRegion) {
    regionSpaceDisplay(sampleRegions);
    return (
        <StatusContainer
        onMouseOver={() => setMsg("regionHover")}
        onMouseOut={() => setMsg("clear")}
        >
          {regionArr.map((r) => {
            if(r === 'x') {
              return null;
            }
            return <RegionBlock 
            key={r.id}
            style={{'backgroundColor': `${r.color}`, 'gridColumnStart': `${r.id}`}}
            >
              {r.id}
            </RegionBlock>
          })}
        </StatusContainer>
    )
  };

  return (
    <RowContainer>
      <span>{hoveredRegion ? `Region: [${hoveredRegion.id}] ` : '...'}</span>
      <SquareIcon style={{ 'fill': `${hoveredRegion.color}` }}/>
    </RowContainer>
  )
};

export default RegionHover;
