import { PointerSetting } from '@/hooks/usePointerProvider';

const frequencies: Record<PointerSetting, number | null> = {
  ACCENT: 1200,
  USUAL: 900,
  MUTED: null,
};

// sound
const audioCtx = new window.AudioContext();

const useMakeSound = (setting: PointerSetting) => {
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

export default useMakeSound;
