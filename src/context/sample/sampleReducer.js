// import types
import {
  UPLOAD_SAMPLE,
  LOAD_SAMPLE,
  EJECT_SAMPLE,
  CREATE_KIT,
  CREATE_REGION,
  ADD_REGION,
  SET_REGIONS,
  SET_RECORD,
  HOVER_REGION,
  CLEAR_HOVER,
  CLICK_REGION,
  CLEAR_CLICK,
  REMOVE_REGION,
  REMOVEALL_REGIONS,
  WAVE_COLOR 
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type){
    case LOAD_SAMPLE:
      return {
        ...state,
        sampleBlob: action.payload
      };

    case EJECT_SAMPLE:
      return {
        ...state,
        loadedKit: null,
        sampleLink: null,
        sampleBlob: null,
        sampleRegions: [],
        setRecording: false,
        hoveredRegion: null,
        clickedRegion: null,
        waveformColor: 'rgb(255, 255, 255, 100)',
        loopColor: 'rgb(255, 255, 255, 100)'
      };

    case ADD_REGION:
      return {
        ...state,
        sampleRegions: [...state.sampleRegions, action.payload]
      };

    case SET_REGIONS:
      return {
        ...state,
        sampleRegions: state.sampleRegions.map(obj => action.payload.find(region => region.id === obj.id) || obj)
      };

    case SET_RECORD:
      return {
        ...state,
        setRecording: action.payload
      };

    case HOVER_REGION:
      return {
        ...state,
        hoveredRegion: action.payload
      };
    
    case CLEAR_HOVER:
      return {
        ...state,
        hoveredRegion: null
      };
    
    case CLICK_REGION:
      return {
        ...state,
        hoveredRegion: null,
        clickedRegion: action.payload
      };
    
    case CLEAR_CLICK:
      return {
        ...state,
        clickedRegion: null
      };

    case REMOVE_REGION:
      return {
        ...state,
        sampleRegions: state.sampleRegions.filter(region => region.id !== action.payload),
        clickedRegion: null
      }

    case REMOVEALL_REGIONS:
      return {
        ...state,
        sampleRegions: [],
        hoveredRegion: null,
        clickedRegion: null
      };

      default:
      return state;
  };
};