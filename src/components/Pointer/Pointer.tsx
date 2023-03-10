import React from 'react';
import AppStyle from '@/styles/App.module.scss';

export type PointerSetting = 'USUAL' | 'ACCENT' | 'MUTED';

export type PointerStatus = {
  id: number;
  isActive: boolean;
  setting: PointerSetting;
};

type Props = {
  status: PointerStatus;
  onClick: (index: number) => void;
};

function Click({ status, onClick }: Props) {
  const activeClass = status.isActive ? AppStyle['is-active'] : '';

  let settingClass = '';
  if (status.setting === 'MUTED') {
    settingClass = AppStyle['is-muted'];
  } else if (status.setting === 'ACCENT') {
    settingClass = AppStyle['is-accent'];
  }

  return (
    <button
      type="button"
      className={`${AppStyle['metronome__click-point']} ${activeClass} ${settingClass}`}
      onClick={() => onClick(status.id)}
    >
      {' '}
    </button>
  );
}

export default Click;
