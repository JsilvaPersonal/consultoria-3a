import React from 'react';
import { getLevel, MISSIONS } from '../data';
import MiniChart from '../components/MiniChart';

export default function HomeScreen({ state, nav }) {
  const { pts, streak, chartData, currentMission } = state;
  const { level } = getLevel(pts);
  const pct = Math.round(((pts - level.min) / (level.max - level.min)) * 100);
  const mission = currentMission || MISSIONS[0];

  const now = new Date();
  const nextDaily = new Date(state.lastDaily);
  nextDaily.setDate(nextDaily.getDate() + 3);
  const daysToDaily = state.lastDaily
    ? Math.max(0, Math.ceil((nextDaily - now) / 86400000))
    : 0;

  return (
    <div>
      <div className="top-bar">
        <h2>Olá, Maria</h2>
        <p>Consultoria Individual 3A</p>
      </div>
      <div className="sec">
        <div className="metric-grid">
          <div className="metric">
            <div className="metric-v">{pts}</div>
            <div className="metric-l">pontos totais</div>
          </div>
          <div className="metric">
            <div className="metric-v">{streak}</div>
            <div className="metric-l">sequência de registros</div>
          </div>
        </div>

        <div className="lv-wrap">
          <div className="lv-row">
            <span className="lv-name">{level.name}</span>
            <span className="lv-pts">{pts} / {level.max} pts</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="sec-title">Missão atual</div>
        <div className="mission-box">
          <div className="mission-tag">Domínio: {mission.domain}</div>
          <div className="mission-txt">{mission.text}</div>
          <div className="mission-pts">+100 pts ao concluir</div>
        </div>

        <div className="reminder">
          <span>
            {daysToDaily === 0
              ? 'Registro disponível hoje'
              : `Próximo registro em ${daysToDaily} dia${daysToDaily > 1 ? 's' : ''}`
            }
          </span>
        </div>

        <div className="sec-title">Evolução</div>
        <div className="chart-wrap">
          <MiniChart data={chartData.slice(-8)} labels={['R1','R2','R3','R4','R5','R6','R7','R8']} />
        </div>
      </div>
    </div>
  );
}
