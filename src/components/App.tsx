import React from 'react';
import Pointers from '@/components/Pointers';
import BPMController from '@/components/BPMController';
import TempoSelector from '@/components/TempoSelector';
import Player from '@/components/Player';
import AppStyle from '@/styles/App.module.scss';
import { AppProvider } from '@/hooks/useAppProvider';
import { PointerProvider } from '@/hooks/usePointerProvider';

function App() {
  return (
    <AppProvider>
      <PointerProvider>
        <div className={AppStyle.metronome}>
          <Pointers />
          <BPMController />
          <TempoSelector />
          <Player />
        </div>
      </PointerProvider>
    </AppProvider>
  );
}

export default App;
