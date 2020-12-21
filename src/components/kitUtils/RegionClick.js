import { useState, useContext } from 'react';
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

const CreateRegionForm = styled.form`
  display: flex;
  place-items: center;
  flex-direction: column;
`

const RegionNameInput = styled.input`
  display: flex;
  margin: 3px;
  padding: 5px;
  font-family: inherit;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px dotted white;
  border-radius: 0.25em;
  place-items: center;
`

const RegionSubmit = styled.input`
  font-family: inherit;
  font-size: 10px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.nav};
  border: 1px solid white;
  border-radius: 0.25em;
  margin: 2px;
  padding: 0.3rem;
  width: 90%;
  text-align: center;
  transition: all 250ms ease 0s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const RegionClick = () => {
  const sampleContext = useContext(SampleContext);
  const { 
    loadedKit,
    clickedRegion, 
    clearClickedRegion, 
    removeSelectedRegion,
    createRegion
  } = sampleContext;
  
  const helpContext = useContext(HelpContext);
  const { setMsg } = helpContext
  
  const [region, setRegion] = useState({ name: '' });

  const { name } = region;

  const onChange = e => setRegion({...region, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || !clickedRegion) {
      // set alert
      console.log('set alert for failed region save');
    } else {
      const { start, end } = clickedRegion;
      const { id } = loadedKit;
      createRegion({
        name: name,
        kit: id,
        start: start,
        end: end,
      });
    };
  };

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

      {!loadedKit ? <></> :
      <CreateRegionForm onSubmit={onSubmit}>
      <RegionNameInput 
      name="name" 
      type="text" 
      placeholder="Region Name" 
      value={name} 
      onChange={onChange}
      className="text-input"
      required
      />
      <RegionSubmit 
      type="submit" 
      value="Save Region" 
      onMouseOver={() => setMsg("saveRegion")}
      onMouseOut={() => setMsg("clear")}
      />

      </CreateRegionForm>
      }
    </RegionEditContainer>
  )
};

export default RegionClick;
