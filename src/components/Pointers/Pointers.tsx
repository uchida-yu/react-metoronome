import React, { useContext, useEffect, useRef } from 'react';
import AppStyle from '@/styles/App.module.scss';
import { PointerContext } from '@/hooks/usePointerProvider';
import { AppContext } from '@/hooks/useAppProvider';

function Pointers() {
  const { pointerStatus, changePointerSetting, changeClickInterval, clearClickInterval, initPointerStatus } =
    useContext(PointerContext);
  const { bpm, isPlay } = useContext(AppContext);
  const refBpm = useRef(bpm);

  useEffect(() => {
    if (bpm !== refBpm.current || !isPlay) {
      clearClickInterval();
      refBpm.current = bpm;

      if (!isPlay) {
        initPointerStatus();
      }
    }

    if (isPlay) {
      changeClickInterval((60 / refBpm.current) * 1000);
    }
  }, [bpm, isPlay]);

  const getActiveClass = (id: number) => (pointerStatus[id].isActive ? AppStyle['is-active'] : '');

  const getSettingClass = (id: number) => {
    let result = '';
    if (pointerStatus[id].setting === 'MUTED') {
      result = AppStyle['is-muted'];
    } else if (pointerStatus[id].setting === 'ACCENT') {
      result = AppStyle['is-accent'];
    }
    return result;
  };

  return (
    <div className={AppStyle.metronome__click}>
      {pointerStatus.map((v) => (
        <button
          key={v.id}
          type="button"
          className={`${AppStyle['metronome__click-point']} ${getSettingClass(v.id)} ${getActiveClass(v.id)}`}
          onClick={() => changePointerSetting(v.id)}
        >
          {' '}
        </button>
      ))}
    </div>
  );
}

export default Pointers;
