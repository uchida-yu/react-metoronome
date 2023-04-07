import React, { useContext, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Play, Stop } from '@phosphor-icons/react';
import AppStyle from '@/styles/App.module.scss';
import makeSound from '@/core/Sound/makeSound';
import { AppContext } from '@/hooks/useAppProvider';
import { PointerContext, PointerStatus } from '@/hooks/usePointerProvider';

function Player() {
  const { isPlay, setIsPlay } = useContext(AppContext);
  const { pointerStatus } = useContext(PointerContext);

  const getActive = (value: PointerStatus[]) => value.find((v) => v.isActive)?.id;
  const refActive = useRef(getActive(pointerStatus));

  useEffect(() => {
    const active = getActive(pointerStatus);
    if (active !== refActive.current) {
      const setting = pointerStatus.find((v) => v.isActive)?.setting;
      if (setting) {
        makeSound(setting);
      }
      refActive.current = active;
    }
  }, [pointerStatus]);

  const changeIsPlay = () => {
    const newValue = !isPlay;
    setIsPlay(newValue);
  };

  return (
    <div className={AppStyle['metronome__button-container']}>
      <button type="button" className={AppStyle['metronome__launch-button']} onClick={() => changeIsPlay()}>
        {isPlay ? <Stop size={60} /> : <Play size={60} />}
      </button>
    </div>
  );
}

export default Player;
