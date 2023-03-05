import React, { useState } from 'react';
import '@/styles/App.scss';
import Pointer from '@/components/Pointer';
import BPMController from '@/components/BPMController';

type PointerStatus = {
  isActive: boolean;
  isMuted: boolean;
};

const initPointerStatusData = () => {
  return Array.from({ length: 4 }, () => ({ isActive: false, isMuted: false }));
};

function App() {
  const [isLaunch, setIsLaunch] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [tempo, setTempo] = useState(1);
  const [pointerStatus, setPointerStatus] = useState<PointerStatus[]>(initPointerStatusData());
  const [clickInterval, setClickInterval] = useState<NodeJS.Timer | null>(null);
  const [nextClick, setNextClick] = useState(0);

  const launch = () => {
    const newIsLaunch = !isLaunch;

    setIsLaunch(newIsLaunch);
    if (!newIsLaunch && clickInterval) {
      clearInterval(clickInterval);
      setClickInterval(null);
      setPointerStatus(initPointerStatusData());
      return;
    }
    setNextClick(0);
    startClick();
  };

  const setClickIntervalExec = (startPoint: number) => {
    let i = startPoint;
    setClickInterval(
      setInterval(() => {
        flashing(i);
        i = i === 3 ? 0 : i + 1;
        setNextClick(i);
      }, (60 / bpm) * 1000),
    );
  };

  const flashing = (i: number) => {
    const newState = [...pointerStatus];
    newState[i].isActive = true;

    if (!pointerStatus[i].isMuted) {
      // TODO:音を鳴らす
    }

    newState[i === 0 ? 3 : i - 1].isActive = false;
    setPointerStatus(newState);
  };

  const startClick = () => {
    if (clickInterval) {
      clearInterval(clickInterval);
      setClickInterval(null);
    }

    flashing(0);
    setClickIntervalExec(1);
  };

  const clickPoint = (index: number) => {
    const newState = [...pointerStatus];
    newState[index].isMuted = !pointerStatus[index].isMuted;
    setPointerStatus(newState);
  };

  const changeBpm = (value: string) => {
    setBpm(Number(value));

    if (clickInterval) {
      clearInterval(clickInterval);
      setClickIntervalExec(nextClick);
    }

    let result = 2;
    if (bpm < 77) {
      result = 1;
    }
    setTempo(result);
  };

  const changeTempo = (value: string) => {
    let result = 0;
    setTempo(Number(value));
    if (tempo === 1) {
      result = 60;
    } else if (tempo === 2) {
      result = 77;
    }
    setBpm(result);
  };

  return (
    <div>
      <div className="metronome">
        <div className="metronome__click">
          {pointerStatus.map((v, i) => (
            <Pointer
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
              isActive={pointerStatus[i].isActive}
              isMuted={pointerStatus[i].isMuted}
              onClick={clickPoint}
            />
          ))}
        </div>

        <BPMController bpm={bpm} onChange={changeBpm} />

        <div className="metronome__tempo">
          <select className="metronome__tempo-select" name="" id="" onChange={(e) => changeTempo(e.target.value)}>
            <option value="1" selected={tempo === 1}>
              andante
            </option>
            <option value="2" selected={tempo === 2}>
              andantino
            </option>
          </select>
        </div>
        <button type="button" className="metronome__launch-button" onClick={launch}>
          {isLaunch ? 'ストップ' : 'スタート'}
        </button>
      </div>
    </div>
  );
}

export default App;
