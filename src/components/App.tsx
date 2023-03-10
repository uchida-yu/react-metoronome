import React, { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Play, Stop } from '@phosphor-icons/react';
import Pointer, { PointerSetting, PointerStatus } from '@/components/Pointer';
import BPMController from '@/components/BPMController';
import TempoSelector from '@/components/TempoSelector';
import AppStyle from '@/styles/App.module.scss';

// sound
const audioCtx = new window.AudioContext();

function App() {
  const examplePointerStatusData = (): PointerStatus[] => {
    return [
      { id: 0, isActive: false, setting: 'ACCENT' },
      { id: 1, isActive: false, setting: 'USUAL' },
      { id: 2, isActive: false, setting: 'MUTED' },
      { id: 3, isActive: false, setting: 'USUAL' },
    ];
  };

  const [isLaunch, setIsLaunch] = useState(false);
  const [bpm, setBpm] = useState(60);
  const refBpm = useRef(bpm);
  const [pointerStatus, setPointerStatus] = useState<PointerStatus[]>(examplePointerStatusData());
  const [clickInterval, setClickInterval] = useState<NodeJS.Timer | null>(null);

  const makeSound = (type: PointerSetting) => {
    if (type === 'MUTED') {
      return;
    }

    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(type === 'USUAL' ? 900 : 1200, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.04);
  };

  const getCurrentPointer = () => pointerStatus.find((v) => v.isActive)?.id ?? 3;

  const setClickIntervalExec = (init = false) => {
    setClickInterval(
      init
        ? null
        : setInterval(() => {
            clicking();
          }, (60 / refBpm.current) * 1000),
    );
  };

  const resetInterval = (init = false) => {
    if (clickInterval) {
      clearInterval(clickInterval);
      setClickIntervalExec(init);
    }
  };

  const clicking = () => {
    const current = getCurrentPointer();
    const next = current !== 3 ? current + 1 : 0;
    makeSound(pointerStatus[next].setting);

    const newState = [...pointerStatus];
    newState[current].isActive = false;
    newState[next].isActive = true;

    setPointerStatus(newState);
  };

  const launch = () => {
    const newIsLaunch = !isLaunch;
    setIsLaunch(newIsLaunch);

    // stop
    if (!newIsLaunch) {
      resetInterval(true);
      setPointerStatus(
        pointerStatus.map((v) => ({
          ...v,
          isActive: false,
        })),
      );
      return;
    }

    // start
    clicking();
    setClickIntervalExec();
  };

  const changePointerSetting = (id: number) => {
    const newState = [...pointerStatus];

    switch (pointerStatus[id].setting) {
      case 'USUAL':
        newState[id].setting = 'ACCENT';
        break;
      case 'ACCENT':
        newState[id].setting = 'MUTED';
        break;
      default:
        newState[id].setting = 'USUAL';
    }

    setPointerStatus(newState);
  };

  const changeBpm = (value: string) => {
    let newBpm = !Number.isNaN(Number(value)) ? Number(value) : refBpm.current;

    if (newBpm < 1) {
      newBpm = 1;
    } else if (newBpm > 500) {
      newBpm = 500;
    }

    refBpm.current = newBpm;
    setBpm(refBpm.current);
    resetInterval();
  };

  const mute = () => {
    // TODO: ミュートする
  };

  const changeVolume = () => {
    // TODO: ボリューム変えれるようにする
  };

  const changeBpmForTap = () => {
    // TODO: タップで変更
  };

  return (
    <div>
      <div className={AppStyle.metronome}>
        <div className={AppStyle.metronome__click}>
          {pointerStatus.map((v) => (
            <Pointer key={v.id} status={v} onClick={changePointerSetting} />
          ))}
        </div>

        <BPMController bpm={bpm} changeBpm={changeBpm} />
        <TempoSelector bpm={bpm} onChange={changeBpm} />
        <div className={AppStyle['metronome__button-container']}>
          <button type="button" className={AppStyle['metronome__launch-button']} onClick={launch}>
            {isLaunch ? <Stop size={60} /> : <Play size={60} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
