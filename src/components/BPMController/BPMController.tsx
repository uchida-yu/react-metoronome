import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Plus, Minus } from '@phosphor-icons/react';
import AppStyle from '@/styles/App.module.scss';

type Props = {
  bpm: number;
  changeBpm: (value: string) => void;
};

function BPMController({ bpm, changeBpm }: Props) {
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
