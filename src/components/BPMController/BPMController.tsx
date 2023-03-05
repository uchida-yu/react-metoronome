import React from 'react';

type Props = {
  bpm: number;
  onChange: (value: string) => void;
};

function BPMController({ bpm, onChange }: Props) {
  return (
    <div className="metronome__bpm">
      <button type="button" className="metronome__bpm-button">
        −
      </button>
      <input
        className="metronome__bpm-input"
        type="number"
        value={bpm}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" className="metronome__bpm-button">
        ＋
      </button>
    </div>
  );
}

export default BPMController;
