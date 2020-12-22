import React, { memo } from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import SamplePlayback from './SamplePlayback';
import SampleControl from './SampleControl';
import DropZone from '../kitUtils/DropZone';
// context
import SampleContext from '../../context/sample/sampleContext';
import KitContext from '../../context/kit/kitContext';
// pkg
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import styled from 'styled-components';

const SampleContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 4;
  grid-column-end: 14;
  padding-right: 2rem;
  padding-left: 2rem;
  overscroll-behavior-x: none;
`

const SampleStation = memo(() => {
  const sampleContext = useContext(SampleContext);
  const {
    sampleBlob,
    updateSampleWaveRegions, 
    sampleRegions,
    setRecording,
    setHoveredRegion,
    clearHoveredRegion,
    setClickedRegion,
  } = sampleContext;
  
  const kitContext = useContext(KitContext);
  const { setLoopBlob } = kitContext;

  // refs for wavesurfer
  const sampleformRef = useRef();
  const sampleWave = useRef();

  // isFirstRender ref
  const isFirstRender = useRef(true);

  // refs for recording 
  const gain = useRef();
  const dest = useRef();
  const mediaRecorder = useRef();

  // state for recording
  const [chunks, setChunks] = useState([]);
  
  useEffect(() => {
    if(!sampleBlob) { return; };

    sampleWave.current = WaveSurfer.create({
      container: sampleformRef.current,
      waveColor: 'white',
      progressColor: '#B8D6DA',
      height: 200,
      cursorColor: 'orange',
      cursorWidth: 2,
      hideScrollbar: false,
      autoCenter: false,
      scrollParent: true,
      plugins: [
        RegionPlugin.create({
          slop: 8,
          regions: []
        })
      ]
    });

    if (sampleBlob) {
      sampleWave.current.load(sampleBlob);
    }

    sampleWave.current.on('region-update-end', (e) => {
      updateSampleWaveRegions([e])
    });

    gain.current = sampleWave.current.backend.ac.createGain();
    sampleWave.current.backend.setFilter(gain.current); 
    dest.current = sampleWave.current.backend.ac.createMediaStreamDestination();
    mediaRecorder.current = new MediaRecorder(dest.current.stream);
    gain.current.connect(dest.current);
    // eslint-disable-next-line
  }, [sampleBlob]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };
    
    recordInput();
    // eslint-disable-next-line
  }, [setRecording]);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };
    if(!sampleBlob) { return; };

    sampleWave.current.clearRegions();
    sampleRegions.forEach(reg => {
      sampleWave.current.addRegion(reg);
    })
    // eslint-disable-next-line
  }, [sampleRegions]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };

    if(!sampleBlob) { return; };

    sampleWave.current.on('region-mouseenter', (e) => {
      setHoveredRegion(e)
    });

    sampleWave.current.on('region-mouseleave', (e) => {
      clearHoveredRegion()
    });

    sampleWave.current.on('region-click', (e) => {
      setClickedRegion(e)
    });
    // eslint-disable-next-line
  }, [sampleBlob]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };
    if(!sampleBlob) { return; };

    window.addEventListener('keydown', handleTrigger);
    return () => window.removeEventListener('keydown', handleTrigger);
    // eslint-disable-next-line
  }, [sampleRegions]);

  // functions 
  const handleTrigger = (e) => {
    if(!sampleBlob) { return; };
    if (document.activeElement.matches('.text-input')) { return; };
    if (!sampleWave.current.regions.list[e.key]) { return; };
    sampleWave.current.regions.list[e.key].play();
  };

  const playSample = () => {
    if(!sampleBlob) { return; };
    sampleWave.current.play();
  };

  const pauseSample = () => {
    if(!sampleBlob) { return; };
    sampleWave.current.playPause();
  };

  const stopSample = () => {
    if(!sampleBlob) { return; };
    sampleWave.current.stop();
  };

  const rateSlider = (val) => {
    if(!sampleBlob) { return; };
    sampleWave.current.setPlaybackRate(val);
  };

  const zoomSlider = (val) => {
    if(!sampleBlob) { return; };
    sampleWave.current.zoom(val);
  };

  const recordInput = () => {
    if(!sampleBlob) { return; };
    
    if(setRecording) {
      setLoopBlob(null);
      let recordedChunks = [];
  
      mediaRecorder.current.start();
      mediaRecorder.current.ondataavailable = (e) => {
        recordedChunks.push(e.data);
      };

      setChunks(recordedChunks);
    } else if (!setRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
        let recordedBlob = URL.createObjectURL(blob);
        setLoopBlob(recordedBlob);
      };
      setChunks([]);
    };
  };

  return (
    <>
    <SamplePlayback 
    playSample={playSample}
    pauseSample={pauseSample}
    stopSample={stopSample}
    rateSlider={rateSlider}
    zoomSlider={zoomSlider}
    />
    { sampleBlob ? <SampleContainer ref={sampleformRef} /> : <DropZone /> }
    <SampleControl />
    </>
  );
});

export default SampleStation;
