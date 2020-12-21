import { useReducer } from 'react';
import { availableId } from '../../utils/availableId';
import SampleContext from './sampleContext';
import sampleReducer from './sampleReducer';
// import types
import {
  LOAD_SAMPLE,
  EJECT_SAMPLE,
  ADD_REGION,
  SET_REGIONS,
  SET_RECORD,
  HOVER_REGION,
  CLICK_REGION,
  CLEAR_CLICK,
  REMOVE_REGION,
  REMOVEALL_REGIONS,
  CLEAR_HOVER
} from '../types';

const SampleState = props => {
  const initialState = {
    kitRegions: [],
    sampleLink: null,
    sampleBlob: null,
    sampleRegions: [],
    setRecording: false,
    hoveredRegion: null,
    clickedRegion: null
  };

  const [state, dispatch] = useReducer(sampleReducer, initialState);

  // Load sample into kit - SampleStation.js
  // sampleBlob: sample
  const loadSample = sample => {
    dispatch({
      type: LOAD_SAMPLE,
      payload: sample
    });
  };

  // Eject sample - SampleStation.js
  const ejectSample = () => {
    if(state.sampleBlob) {
      URL.revokeObjectURL(state.sampleBlob);
    };

    dispatch({ type: EJECT_SAMPLE });
  };

  // Add Region to sample waveform - RegionCreator.js
  // sampleRegions: ...regions, region
  const addRegion = (start = 0, end = 4) => {
    if(!state.sampleBlob && !state.loadedKit) { return; };

    let arr = state.sampleRegions.map(r => r.id);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);

    const region = {
      id: `${availableId(arr)}`,
      start: `${start}`,
      end: `${end}`,
      loop: false,
      color: `rgb(${r}, ${g}, ${b}, 0.4)`
    };

    dispatch({
      type: ADD_REGION,
      payload: region
    });
  };

  // update Region in sampleRegions array after an update (resize,drag) - SampleStation.js
  // sampleRegions: update specific region within array
  const updateSampleWaveRegions = region => {
    dispatch({
      type: SET_REGIONS,
      payload: region
    });
  };

  // set recording status to true - SamplePlayback.js
  // setRecord: !state.setRecording
  const setRecord = status => {
    if(!state.sampleBlob && !state.loadedKit) { return; };

    dispatch({ 
      type: SET_RECORD,
      payload: status 
    });
  };

  // set Region that is being hovered to display in RegionHover.js - SampleStation.js 
  // hoveredRegion: region
  const setHoveredRegion = region => {
    dispatch({
      type: HOVER_REGION,
      payload: region
    });
  };

  // unset Region that was hovered - SampleStation.js
  // hoveredRegion: null
  const clearHoveredRegion = () => {
    dispatch({ type: CLEAR_HOVER });
  };

  // set clicked region to load into RegionClick.js - SampleStation.js
  // clickedRegion: region
  const setClickedRegion = region => {
    dispatch({
      type: CLICK_REGION,
      payload: region
    });
  };

  // clear clicked region from RegionClick.js
  // clickedRegion: null
  const clearClickedRegion = () => {
    dispatch({ type: CLEAR_CLICK });
  };

  // Remove region from current waveform
  // sampleRegions: remove specific region from array
  const removeSelectedRegion = id => {
    dispatch({
      type: REMOVE_REGION,
      payload: id
    });
  };

  // Remove all regions from current waveform
  // sampleRegions: []
  const removeAllRegions = () => {
    dispatch({ type: REMOVEALL_REGIONS })
  };

  return (
    <SampleContext.Provider
    value={{
      kitRegions: state.kitRegions,
      sampleLink: state.sampleLink,
      sampleBlob: state.sampleBlob,
      sampleRegions: state.sampleRegions,
      setRecording: state.setRecording,
      hoveredRegion: state.hoveredRegion,
      clickedRegion: state.clickedRegion,
      loadSample,
      ejectSample,
      addRegion,
      updateSampleWaveRegions,
      setRecord,
      setHoveredRegion,
      setClickedRegion,
      clearHoveredRegion,
      clearClickedRegion,
      removeSelectedRegion,
      removeAllRegions
    }}
    >
      {props.children}
    </SampleContext.Provider>
  );
};

export default SampleState;
