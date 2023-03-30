import React, { useContext } from 'react';
import AppStyle from '@/styles/App.module.scss';
import { AppContext } from '@/hooks/useAppProvider';

type tempoMark = {
  name: string;
  min: number;
  max: number;
};

const tempoMarkList: tempoMark[] = [
  { name: 'Largo', min: 40, max: 49 },
  { name: 'Lento', min: 50, max: 55 },
  { name: 'Adagio', min: 56, max: 62 },
  { name: 'Andante', min: 63, max: 75 },
  { name: 'Moderato', min: 76, max: 95 },
];

function TempoSelector() {
  const { bpm, changeBpm } = useContext(AppContext);
  const getTempoMark = () => tempoMarkList.find((v) => v.min <= bpm && bpm <= v.max)?.min;
  return (
    <div className={AppStyle.metronome__tempo}>
      <select
        className={AppStyle['metronome__tempo-select']}
        defaultValue={getTempoMark()}
        onChange={(e) => changeBpm(e.target.value)}
      >
        {tempoMarkList.map((v) => (
          <option key={v.name} value={v.min}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TempoSelector;
