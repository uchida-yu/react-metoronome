import React from 'react';

type Props = {
  index: number;
  isActive: boolean;
  isMuted: boolean;
  onClick: (index: number) => void;
};

function Click({ index, isActive, isMuted, onClick }: Props) {
  const activeClass = isActive ? 'is-active' : '';
  const mutedClass = isMuted ? 'is-muted' : '';
  return (
    <button
      type="button"
      className={`metronome__click-point ${activeClass} ${mutedClass}`}
      onClick={() => onClick(index)}
    >
      {' '}
    </button>
  );
}

export default Click;
