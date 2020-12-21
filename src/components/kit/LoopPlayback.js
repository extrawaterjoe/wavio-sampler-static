import { useContext } from 'react';
import HelpContext from '../../context/help/helpContext';

import styled from 'styled-components';
import {ReactComponent as PlayIcon} from '../../css/icons/play.svg';
import {ReactComponent as PauseIcon} from '../../css/icons/pause.svg';
import {ReactComponent as ResizeIcon} from '../../css/icons/resize.svg';
import {ReactComponent as CaptureIcon} from '../../css/icons/capture.svg';
import {ReactComponent as DownloadIcon} from '../../css/icons/download.svg';

const LoopPlaybackCotrols = styled.div`
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 4;
  grid-column-end: 14;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 0.25em;
  margin: 2rem 1rem 0rem 1rem;
  display: flex;
  place-items: center;
  padding: 0rem 1rem;
  & > svg {
    margin: 0rem 0.5rem;
    height:0.8rem; 
    width: 0.8rem;
  }
  & > a {
    margin: 0rem 0.5rem;
    height:0.8rem; 
    width: 0.8rem;
  }
  & > #loop-play {
    fill: #36d941;
  }
  & > #loop-pause {
    fill: #54b8ff;
    margin-right: 20px;
  }
  & > #loop-play :hover {
    fill: #7fe381;
  }
`

const UtilButton = styled.button`
  display: flex;
  height: 18px;
  margin: 2px 6px;
  padding: 3px 6px;
  padding-bottom: 4px;
  font-family: inherit;
  font-size: 11px;
  place-items: center; 
  background-color: ${({ theme }) => theme.nav};
  border: none;
  border-radius: 0.25em;
  color: ${({ theme }) => theme.text};
  transition: all 250ms ease 0s;
  & > a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
  & > svg {
    fill: white;
    margin: 0rem 0.5rem;
    height:0.7rem; 
    width: 0.7rem;
  }
  & > a > svg {
    fill: white;
    margin: 0rem 0.5rem;
    height:0.7rem; 
    width: 0.7rem;
  }
  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:hover > #resize-loop {
    fill: #ff96f1;
  }
  &:hover > #capture-loop {
    fill: #ff9100;
  }
  &:hover > a > #download-loop {
    fill: #59ffaf;
  }
`

const SlideContainer = styled.div`
  display: flex;
  margin-left: auto;
  place-items: center;
`

const ZoomSlider = styled.input``

const LoopPlayback = ({ ...props }) => {
  const helpContext = useContext(HelpContext)
  const { setMsg } = helpContext;

  const { 
    playLoop, 
    pauseLoop,
    zoomSlider,
    resizeLoop,
    clipLoop,
    loopBlob
  } = props;

  return (
    <LoopPlaybackCotrols>

      <PlayIcon 
      id="loop-play"
      onClick={playLoop} 
      />

      <PauseIcon 
      id="loop-pause"
      onClick={pauseLoop}
      />

      <UtilButton 
      onClick={resizeLoop}
      onMouseOver={() => setMsg("editLoop")}
      onMouseOut={() => setMsg("clear")}
      >
      <span>Edit</span>
      <ResizeIcon id="resize-loop"/>
      </UtilButton>

      <UtilButton 
      onClick={clipLoop}
      onMouseOver={() => setMsg("captureLoop")}
      onMouseOut={() => setMsg("clear")}
      >
      <span>Capture</span>
      <CaptureIcon id="capture-loop"/>
      </UtilButton>

      <UtilButton
      onMouseOver={() => setMsg("downloadLoop")}
      onMouseOut={() => setMsg("clear")}
      >
      <a href={loopBlob} download>
      <span>Download</span>
      <DownloadIcon id="download-loop"/>
      </a>
      </UtilButton>

      {/* <SlideContainer>
        <span>Zoom:</span> 
        <ZoomSlider
        className="slider"
        type="range"
        min="0"
        max="500"
        step="0.5"
        onChange={(e) => zoomSlider(e.target.value)}
        />
      </SlideContainer> */}

    </LoopPlaybackCotrols>
  )
};

export default LoopPlayback;
