import React, { createContext, ReactNode, useMemo, useState } from 'react';

type Props = {
  children: ReactNode;
};

export type PointerSetting = 'USUAL' | 'ACCENT' | 'MUTED';

export type PointerStatus = {
  id: number;
  isActive: boolean;
  setting: PointerSetting;
};

const examplePointerStatusData = (): PointerStatus[] => {
  return [
    { id: 0, isActive: false, setting: 'ACCENT' },
    { id: 1, isActive: false, setting: 'USUAL' },
    { id: 2, isActive: false, setting: 'MUTED' },
    { id: 3, isActive: false, setting: 'USUAL' },
  ];
};

export const PointerContext = createContext<{
  pointerStatus: PointerStatus[];
  changePointerStatus: (value: React.SetStateAction<PointerStatus[]>) => void;
  changePointerSetting: (id: number) => void;
  clickInterval: NodeJS.Timer | null;
  changeClickInterval: (sm: number) => void;
  clearClickInterval: () => void;
  initPointerStatus: () => void;
}>({
  pointerStatus: examplePointerStatusData(),
  changePointerStatus: () => {
    throw Error('changePointerStatus not set');
  },
  changePointerSetting: () => {
    throw Error('changePointerSetting not set');
  },
  clickInterval: null,
  changeClickInterval: () => {
    throw Error('changeClickInterval not set');
  },
  clearClickInterval: () => {
    throw Error('clearClickInterval not set');
  },
  initPointerStatus: () => {
    throw Error('initPointerStatus not set');
  },
});

export function PointerProvider({ children }: Props) {
  const [pointerStatus, setPointerStatus] = useState<PointerStatus[]>(examplePointerStatusData());
  const [clickInterval, setClickInterval] = useState<NodeJS.Timer | null>(null);

  const initPointerStatus = () => {
    setPointerStatus(examplePointerStatusData);
  };

  const changeClickInterval = (sm: number) => {
    if (!clickInterval) {
      flashing();
    }

    setClickInterval(
      setInterval(() => {
        flashing();
      }, sm),
    );
  };
  const clearClickInterval = () => {
    if (clickInterval) {
      clearInterval(clickInterval);
    }
    setClickInterval(null);
  };

  const changePointerStatus = (value: React.SetStateAction<PointerStatus[]>) => {
    setPointerStatus(value);
  };

  const changePointerSetting = (id: number) => {
    const newState = [...pointerStatus];

    switch (pointerStatus[id].setting) {
      case 'USUAL':
        newState[id].setting = 'ACCENT';
        break;
      case 'ACCENT':
        newState[id].setting = 'MUTED';
        break;
      default:
        newState[id].setting = 'USUAL';
    }

    setPointerStatus(newState);
  };

  const flashing = () => {
    const current = pointerStatus.find((v) => v.isActive)?.id ?? 3;
    const next = current !== 3 ? current + 1 : 0;
    const newState = [...pointerStatus];
    newState[current].isActive = false;
    newState[next].isActive = true;
    changePointerStatus(newState);
  };

  const memo = useMemo(
    () => ({
      pointerStatus,
      changePointerStatus,
      changePointerSetting,
      clickInterval,
      changeClickInterval,
      clearClickInterval,
      initPointerStatus,
    }),
    [pointerStatus, clickInterval],
  );

  return <PointerContext.Provider value={memo}>{children}</PointerContext.Provider>;
}
