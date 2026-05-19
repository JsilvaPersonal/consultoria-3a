import React from 'react';
import { getLevel, CONQUESTS } from '../data';
import MiniChart from '../components/MiniChart';

const CONQUEST_ICONS = { star: '★', flame: '🔥', 'calendar-check': '📅', trophy: '🏆' };

export default function ProgressScreen({ state }) {
  const { pts, streak, chartData, missionsCompleted, totalDays, domainsStabilized } = state;
  const { level, index } = getLevel(pts);
  const pct = Math.round(((pts - level.min) / (level.max - level.min)) * 100);

  return (
    <div>
      <div className="top-bar">
        <h2>Meu progresso</h2>
        <p>Evolução e conquistas</p>
      </div>
      <div className="sec">

        <div className="streak-box">
          <div className="streak-n">{streak}</div>
          <div>
            <div className="streak-t">registros seguidos</div>
            <div className="streak-s">Total de dias: {totalDays || 0}</div>
          </div>
        </div>

        <div className="metric-grid">
          <div className="metric">
            <div className="metric-v">{pts}</div>
            <div className="metric-l">pontos totais</div>
          </div>
          <div className="metric">
            <div className="metric-v">{missionsCompleted || 0}</div>
            <div className="metric-l">missões cumpridas</div>
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
          <div className="lv-next">
            {index < 4 ? `Próximo nível: faltam ${level.max - pts} pts` : 'Nível máximo atingido!'}
          </div>
        </div>

        <div className="sec-title">Linha do tempo</div>
        <div className="chart-wrap">
          <MiniChart
            data={chartData.slice(-9)}
            labels={['R1','R2','R3','R4','R5','R6','R7','R8','R9'].slice(0, Math.min(9, chartData.length))}
            highlightLast
          />
        </div>

        <div className="sec-title">Conquistas</div>
        <div className="cq-grid">
          {CONQUESTS.map(c => {
            const unlocked = c.condition(state);
            return (
              <div key={c.id} className={`cq-item${unlocked ? ' unlocked' : ''}`}>
                <div className="cq-icon">{CONQUEST_ICONS[c.icon] || '★'}</div>
                <div className="cq-label">{c.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
