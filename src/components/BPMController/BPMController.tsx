import React from 'react';
import AppStyle from '@/styles/App.module.scss';

type Props = {
  bpm: number;
  onChange: (value: string) => void;
};

function BPMController({ bpm, onChange }: Props) {
  return (
    <div className={AppStyle.metronome__bpm}>
      <button type="button" className={AppStyle['metronome__bpm-button']}>
        −
      </button>
      <input
        className={AppStyle['metronome__bpm-input']}
        type="number"
        value={bpm}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" className={AppStyle['metronome__bpm-button']}>
        ＋
      </button>
    </div>
  );
}

export default BPMController;
