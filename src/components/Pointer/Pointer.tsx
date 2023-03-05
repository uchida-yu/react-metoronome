import React from 'react';

export type PointerSetting = 'USUAL' | 'ACCENT' | 'MUTED';

type Props = {
  index: number;
  isActive: boolean;
  setting: PointerSetting;
  onClick: (index: number) => void;
};

function Click({ index, isActive, setting, onClick }: Props) {
  const activeClass = isActive ? 'is-active' : '';

  let settingClass = '';
  if (setting === 'MUTED') {
    settingClass = 'is-muted';
  } else if (setting === 'ACCENT') {
    settingClass = 'is-accent';
  }

  return (
    <button
      type="button"
      className={`metronome__click-point ${activeClass} ${settingClass}`}
      onClick={() => onClick(index)}
    >
      {' '}
    </button>
  );
}

export default Click;
