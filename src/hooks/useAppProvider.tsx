import React, { createContext, ReactNode, useMemo, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const AppContext = createContext<{
  bpm: number;
  changeBpm: (value: string) => void;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  bpm: 60,
  changeBpm: () => {
    throw Error('changeBpm not set');
  },
  isPlay: false,
  setIsPlay: () => {
    throw Error('setIsPlay not set');
  },
});

export function AppProvider({ children }: Props) {
  const [bpm, setBpm] = useState(60);
  const [isPlay, setIsPlay] = useState(false);

  const changeBpm = (value: string) => {
    let newBpm = !Number.isNaN(Number(value)) ? Number(value) : 60;

    if (newBpm < 1) {
      newBpm = 1;
    } else if (newBpm > 500) {
      newBpm = 500;
    }

    setBpm(newBpm);
  };

  const AppMemo = useMemo(() => ({ bpm, changeBpm, isPlay, setIsPlay }), [bpm, isPlay]);

  return <AppContext.Provider value={AppMemo}>{children}</AppContext.Provider>;
}
