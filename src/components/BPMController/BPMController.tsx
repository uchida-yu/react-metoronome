import React, { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Plus, Minus } from '@phosphor-icons/react';
import AppStyle from '@/styles/App.module.scss';
import { AppContext } from '@/hooks/useAppProvider';

function BPMController() {
  const { bpm, changeBpm } = useContext(AppContext);
  return (
    <div className={AppStyle.metronome__bpm}>
      <button type="button" className={AppStyle['metronome__bpm-button']} onClick={() => changeBpm(String(bpm - 1))}>
        <Minus size={32} />
      </button>
      <input
        className={AppStyle['metronome__bpm-input']}
        type="number"
        value={bpm}
        min="1"
        max="500"
        onChange={(event) => changeBpm(event.target.value)}
      />
      <button type="button" className={AppStyle['metronome__bpm-button']} onClick={() => changeBpm(String(bpm + 1))}>
        <Plus size={32} />
      </button>
    </div>
  );
}

export default BPMController;
