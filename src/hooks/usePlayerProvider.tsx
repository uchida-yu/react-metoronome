import React, { createContext, ReactNode, useMemo } from 'react';
import { PointerSetting } from '@/hooks/usePointerProvider';

type Props = {
  children: ReactNode;
};

const frequencies: Record<PointerSetting, number | null> = {
  ACCENT: 1200,
  USUAL: 900,
  MUTED: null,
};

// sound
const audioCtx = new window.AudioContext();

const makeSound = (setting: PointerSetting) => {
  const frequency = frequencies[setting];

  if (!frequency) {
    return;
  }

  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.04);
};

export const PlayContext = createContext<{
  makeSound: (setting: PointerSetting) => void;
}>({
  makeSound: () => {
    throw Error('setIsPlay not set');
  },
});

export function PlayerProvider({ children }: Props) {
  const memo = useMemo(() => ({ makeSound }), []);
  return <PlayContext.Provider value={memo}>{children}</PlayContext.Provider>;
}
