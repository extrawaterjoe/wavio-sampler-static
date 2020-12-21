import { useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import SampleContext from '../../context/sample/sampleContext';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00ff7b';
  }
  if (props.isDragReject) {
      return '#ff4d67';
  }
  if (props.isDragActive) {
      return '#54b3ff';
  }
  return '#eeeeee';
}

const DropContainer = styled.div`
  display: grid;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 4;
  grid-column-end: 14;
  height: 220px;
  margin: 0 2em;
  padding-right: 2rem;
  padding-left: 2rem;
  flex-direction: column;
  place-items: center;
  border-width: 2px;
  border-radius: 1em;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  outline: none;
  transition: border .24s ease-in-out;
`;

const DropText = styled.div`
  background-color: rgb(255,250,250, 0.3);
  padding: 3em;
  border: 1px dotted white;
  border-radius: 0.25em;
  transition: all 250ms ease 0s;
  &:hover {
  background-color: rgb(255,250,250, 0.1);
  }
`

const DropZone = (props) => {
  const sampleContext = useContext(SampleContext);
  const { loadSample } = sampleContext;

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'audio/*',  
    maxFiles: 1,
    maxSize: 10000000
  });

  useEffect(() => {
    if (acceptedFiles.length === 0) { return; };
    acceptedFiles.forEach(file => { 
      const sampleURL = URL.createObjectURL(file)
      loadSample(sampleURL);
    });
    // eslint-disable-next-line
  },[acceptedFiles])

  return (
      <DropContainer {...getRootProps({
        isDragActive, 
        isDragAccept, 
        isDragReject,
        })}>
        <input {...getInputProps()} />
        <DropText>
          DRAG-N-DROP AN AUDIO FILE OR CLICK TO SELECT (10MB LIMIT)
        </DropText>
      </DropContainer>
  )
}

export default DropZone;
