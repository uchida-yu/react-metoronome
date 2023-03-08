import React from 'react';
import AppStyle from '@/styles/App.module.scss';

export type PointerSetting = 'USUAL' | 'ACCENT' | 'MUTED';

type Props = {
  index: number;
  isActive: boolean;
  setting: PointerSetting;
  onClick: (index: number) => void;
};

function Click({ index, isActive, setting, onClick }: Props) {
  const activeClass = isActive ? AppStyle['is-active'] : '';

  let settingClass = '';
  if (setting === 'MUTED') {
    settingClass = AppStyle['is-muted'];
  } else if (setting === 'ACCENT') {
    settingClass = AppStyle['is-accent'];
  }

  return (
    <button
      type="button"
      className={`${AppStyle['metronome__click-point']} ${activeClass} ${settingClass}`}
      onClick={() => onClick(index)}
    >
      {' '}
    </button>
  );
}

export default Click;
