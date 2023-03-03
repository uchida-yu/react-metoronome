import React, { ChangeEvent, useState } from 'react';
import '@/styles/App.scss';

function App() {
  const [isLaunch, setIsLaunch] = useState(true);
  const [bpm, setBpm] = useState(60);
  const [tempo, setTempo] = useState(1);

  const launch = () => {
    setIsLaunch(!isLaunch);
  };

  const changeBpm = (value: string) => {
    setBpm(Number(value));

    let result = 2;
    if (bpm < 77) {
      result = 1;
    }
    setTempo(result);
  };

  const changeTempo = (value: string) => {
    let result = 0;
    setTempo(Number(value));
    if (tempo === 1) {
      result = 60;
    } else if (tempo === 2) {
      result = 77;
    }
    setBpm(result);
  };

  return (
    <div>
      <div className="metronome">
        <div className="metronome__click">
          <button type="button" className="metronome__click-point">
            {' '}
          </button>
          <button type="button" className="metronome__click-point">
            {' '}
          </button>
          <button type="button" className="metronome__click-point">
            {' '}
          </button>
          <button type="button" className="metronome__click-point">
            {' '}
          </button>
        </div>

        <div className="metronome__bpm">
          <button type="button" className="metronome__bpm-button">
            −
          </button>
          <input
            className="metronome__bpm-input"
            type="number"
            value={bpm}
            onChange={(e) => changeBpm(e.target.value)}
          />
          <button type="button" className="metronome__bpm-button">
            ＋
          </button>
        </div>
        <div className="metronome__tempo">
          <select className="metronome__tempo-select" name="" id="" onChange={(e) => changeTempo(e.target.value)}>
            <option value="1" selected={tempo === 1}>
              andante
            </option>
            <option value="2" selected={tempo === 2}>
              andantino
            </option>
          </select>
        </div>
        <button type="button" className="metronome__launch-button" onClick={launch}>
          {isLaunch ? 'ストップ' : 'スタート'}
        </button>
      </div>
    </div>
  );
}

export default App;
