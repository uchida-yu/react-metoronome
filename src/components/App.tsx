import React, { useRef, useState } from 'react';
import Pointer, { PointerSetting } from '@/components/Pointer';
import BPMController from '@/components/BPMController';
import TempoSelector from '@/components/TempoSelector';
import AppStyle from '@/styles/App.module.scss';

type PointerStatus = {
  isActive: boolean;
  setting: PointerSetting;
};

const initPointerStatusData = (): PointerStatus[] => {
  return Array.from({ length: 4 }, () => ({ isActive: false, setting: 'USUAL' }));
};

function App() {
  const [isLaunch, setIsLaunch] = useState(false);
  const [bpm, setBpm] = useState(60);
  const refBpm = useRef(bpm);
  const [pointerStatus, setPointerStatus] = useState<PointerStatus[]>(initPointerStatusData());
  const [clickInterval, setClickInterval] = useState<NodeJS.Timer | null>(null);
  const [nextClick, setNextClick] = useState(0);

  const launch = () => {
    const newIsLaunch = !isLaunch;

    setIsLaunch(newIsLaunch);
    if (!newIsLaunch && clickInterval) {
      clearInterval(clickInterval);
      setClickInterval(null);
      setPointerStatus(
        pointerStatus.map((v) => ({
          isActive: false,
          setting: v.setting,
        })),
      );
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
      }, (60 / refBpm.current) * 1000),
    );
  };

  const flashing = (i: number) => {
    const newState = [...pointerStatus];
    newState[i].isActive = true;

    switch (pointerStatus[i].setting) {
      case 'USUAL':
        // TODO:普通の音を鳴らす
        break;
      case 'ACCENT':
        // TODO:目立つ音を鳴らす
        break;
      default:
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

    switch (pointerStatus[index].setting) {
      case 'USUAL':
        newState[index].setting = 'ACCENT';

        break;
      case 'ACCENT':
        setPointerStatus(newState);
        newState[index].setting = 'MUTED';
        break;
      default:
        newState[index].setting = 'USUAL';
    }

    setPointerStatus(newState);
  };

  const changeBpm = (value: string) => {
    refBpm.current = Number(value);
    setBpm(refBpm.current);

    // FIXME: bpmが古いままsetされる
    if (clickInterval) {
      clearInterval(clickInterval);
      setClickIntervalExec(nextClick);
    }
  };

  const changeTempo = (value: string) => {
    refBpm.current = Number(value);
    setBpm(refBpm.current);

    // FIXME: bpmが古いままsetされる
    if (clickInterval) {
      clearInterval(clickInterval);
      setClickIntervalExec(nextClick);
    }
  };

  return (
    <div>
      <div className={AppStyle.metronome}>
        <div className={AppStyle.metronome__click}>
          {pointerStatus.map((v, i) => (
            <Pointer
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
              isActive={pointerStatus[i].isActive}
              setting={pointerStatus[i].setting}
              onClick={clickPoint}
            />
          ))}
        </div>

        <BPMController bpm={bpm} onChange={changeBpm} />
        <TempoSelector bpm={bpm} onChange={changeTempo} />

        <button type="button" className={AppStyle['metronome__launch-button']} onClick={launch}>
          {isLaunch ? 'ストップ' : 'スタート'}
        </button>
      </div>
    </div>
  );
}

export default App;
