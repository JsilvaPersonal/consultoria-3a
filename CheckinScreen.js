import React, { useState } from 'react';
import { calcCheckinPoints, getNextMission } from '../data';

const DOMAINS = [
  { key: 'train',  label: 'Treino',         sub: 'Consistência nas últimas 2 semanas — 1 muito baixa, 5 excelente' },
  { key: 'sleep',  label: 'Sono',            sub: 'Qualidade geral do sono nas últimas 2 semanas — 1 muito ruim, 5 excelente' },
  { key: 'stress', label: 'Estresse',        sub: 'Nível geral de estresse — 1 muito alto, 5 tranquila' },
  { key: 'food',   label: 'Alimentação',     sub: 'Padrão alimentar geral nas últimas 2 semanas — 1 muito ruim, 5 excelente' },
  { key: 'self',   label: 'Autopercepção',   sub: 'Como você se sentiu no seu corpo nas últimas 2 semanas — 1 muito mal, 5 ótima' },
];

export default function CheckinScreen({ state, updateState, nav }) {
  const [prevMission, setPrevMission] = useState(null);
  const [scores, setScores]           = useState({});
  const [victory, setVictory]         = useState('');
  const [done, setDone]               = useState(false);
  const [earned, setEarned]           = useState(0);
  const [newMission, setNewMission]   = useState(null);

  function setScore(key, val) { setScores(p => ({ ...p, [key]: val })); }

  function submit() {
    const pts = calcCheckinPoints(prevMission);
    const mission = getNextMission(scores);
    const newPts = state.pts + pts;
    const newChart = [...(state.chartData || []), newPts].slice(-20);
    updateState({
      pts: newPts,
      chartData: newChart,
      currentMission: mission,
      missionsCompleted: (state.missionsCompleted || 0) + (prevMission === 'Cumpri' ? 1 : 0),
      lastCheckin: new Date().toISOString(),
      history: [...(state.history || []), {
        type: 'checkin', date: new Date().toISOString(),
        data: { prevMission, scores, victory }, pts
      }],
    });
    setEarned(pts);
    setNewMission(mission);
    setDone(true);
  }

  if (done && newMission) return (
    <div className="success-wrap">
      <div className="success-ico">&#10003;</div>
      <div className="success-title">Check-in enviado!</div>
      <div className="pts-pill">+{earned} pontos</div>
      <div className="mission-box" style={{ width: '100%', marginTop: 8 }}>
        <div className="mission-tag">Nova missão — domínio: {newMission.domain}</div>
        <div className="mission-txt">{newMission.text}</div>
        <div className="mission-pts">+100 pts ao concluir</div>
      </div>
      <button className="btn-main" onClick={() => nav('home')}>Voltar ao início</button>
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <h2>Check-in quinzenal</h2>
        <p>Avaliação completa dos 5 domínios</p>
      </div>
      <div className="sec">

        <div className="mission-box mission-warn">
          <div className="mission-tag" style={{ color: '#B7950B' }}>Missão anterior</div>
          <div className="mission-txt">{(state.currentMission || {}).text || '—'}</div>
          <div className="cq-wrap" style={{ marginTop: 10, marginBottom: 0 }}>
            <div className="cq-title" style={{ fontSize: 13 }}>Você conseguiu cumprir?</div>
            <div className="tog-row" style={{ marginTop: 6 }}>
              {['Cumpri', 'Parcial', 'Não consegui'].map(v => (
                <button key={v} className={`tog${prevMission === v ? ' sel' : ''}`} onClick={() => setPrevMission(v)}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        {DOMAINS.map(d => (
          <div className="cq-wrap" key={d.key}>
            <div className="cq-title">{d.label}</div>
            <div className="cq-sub">{d.sub}</div>
            <div className="scale-row">
              {['1','2','3','4','5'].map(v => (
                <button key={v} className={`sc-btn${scores[d.key] === v ? ' sel' : ''}`} onClick={() => setScore(d.key, v)}>{v}</button>
              ))}
            </div>
          </div>
        ))}

        <div className="cq-wrap">
          <div className="cq-title">Vitória da quinzena</div>
          <div className="cq-sub">Por menor que pareça — registre uma conquista sua</div>
          <textarea
            className="cq-area"
            placeholder="Ex: fui ao treino mesmo cansada, bebi água todos os dias..."
            value={victory}
            onChange={e => setVictory(e.target.value)}
          />
        </div>

        <button className="btn-main" onClick={submit}>Enviar check-in</button>
      </div>
    </div>
  );
}
