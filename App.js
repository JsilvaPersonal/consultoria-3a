import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import DailyScreen from './screens/DailyScreen';
import CheckinScreen from './screens/CheckinScreen';
import ProgressScreen from './screens/ProgressScreen';
import { getInitialState, saveState } from './data';
import './styles.css';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [state, setState] = useState(getInitialState);

  useEffect(() => { saveState(state); }, [state]);

  function updateState(updates) {
    setState(prev => ({ ...prev, ...updates }));
  }

  function nav(s) { setScreen(s); }

  return (
    <div className="app-wrap">
      <div className="app">
        <div className="screen-area">
          {screen === 'home'     && <HomeScreen     state={state} nav={nav} />}
          {screen === 'daily'    && <DailyScreen    state={state} updateState={updateState} nav={nav} />}
          {screen === 'checkin'  && <CheckinScreen  state={state} updateState={updateState} nav={nav} />}
          {screen === 'progress' && <ProgressScreen state={state} nav={nav} />}
        </div>
        <nav className="bottom-nav">
          <button className={`nav-btn${screen==='home'?' active':''}`}     onClick={() => nav('home')}>
            <span className="nav-icon">&#8962;</span><span className="nav-label">Início</span>
          </button>
          <button className={`nav-btn${screen==='daily'?' active':''}`}    onClick={() => nav('daily')}>
            <span className="nav-icon">&#9998;</span><span className="nav-label">Registrar</span>
          </button>
          <button className={`nav-btn${screen==='checkin'?' active':''}`}  onClick={() => nav('checkin')}>
            <span className="nav-icon">&#9745;</span><span className="nav-label">Check-in</span>
          </button>
          <button className={`nav-btn${screen==='progress'?' active':''}`} onClick={() => nav('progress')}>
            <span className="nav-icon">&#128200;</span><span className="nav-label">Progresso</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
