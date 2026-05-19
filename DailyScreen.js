import React, { useState } from 'react';
import { calcDailyPoints } from '../data';

const ACTIVITIES = ['Caminhada', 'Tênis', 'Bike', 'Natação', 'Spinning', 'Outra'];

export default function DailyScreen({ state, updateState, nav }) {
  const [form, setForm] = useState({ gym: null, progress: null, intensity: null, pain: null, food: null, water: null, sleep: null, extra: null, foodCtx: '', activities: [] });
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState(0);

  function setF(key, val) { setForm(p => ({ ...p, [key]: val })); }

  function toggleActivity(a) {
    setForm(p => ({
      ...p,
      activities: p.activities.includes(a) ? p.activities.filter(x => x !== a) : [...p.activities, a]
    }));
  }

  function submit() {
    const pts = calcDailyPoints(form);
    const newPts = state.pts + pts;
    const newStreak = state.streak + 1;
    const newChart = [...(state.chartData || []), newPts].slice(-20);
    updateState({
      pts: newPts,
      streak: newStreak,
      totalDays: (state.totalDays || 0) + 1,
      chartData: newChart,
      lastDaily: new Date().toISOString(),
      history: [...(state.history || []), { type: 'daily', date: new Date().toISOString(), data: form, pts }],
    });
    setEarned(pts);
    setDone(true);
  }

  const now = new Date();
  const d3 = new Date(now);
  d3.setDate(d3.getDate() - 3);
  const range = `${d3.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} a ${now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;

  if (done) return (
    <div className="success-wrap">
      <div className="success-ico">&#10003;</div>
      <div className="success-title">Registro salvo!</div>
      <div className="pts-pill">+{earned} pontos</div>
      <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>Ótimo trabalho. Continue assim — cada registro conta para sua evolução.</p>
      <button className="btn-main" onClick={() => nav('home')}>Voltar ao início</button>
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <h2>Registro dos últimos 3 dias</h2>
        <p>{range}</p>
      </div>
      <div className="sec">

        <div className="card">
          <div className="card-title">Sessões de musculação</div>
          <div className="card-sub">Quantas vezes você treinou nos últimos 3 dias?</div>
          <div className="tog-row">
            {['0','1','2','3'].map(v => (
              <button key={v} className={`tog${form.gym === v ? ' sel' : ''}`} onClick={() => setF('gym', v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Evolução de carga nos treinos</div>
          <div className="card-sub">Você conseguiu aumentar o peso em algum exercício nesses dias?</div>
          <div className="tog-row" style={{ flexWrap: 'wrap', gap: 6 }}>
            {[
              { val: '0', label: 'Não aumentei em nenhum' },
              { val: '1', label: 'Em 1 ou 2 exercícios' },
              { val: '2', label: 'Em 3 a 5 exercícios' },
              { val: '3', label: 'Em mais de 5' },
              { val: '4', label: 'Em todos' },
            ].map(({ val, label }) => (
              <button
                key={val}
                className={`tog${form.progress === val ? ' sel' : ''}`}
                style={{ flex: 'none', width: 'calc(50% - 3px)', marginBottom: 2 }}
                onClick={() => setF('progress', val)}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Foco e intensidade nos treinos</div>
          <div className="card-sub">Como você avalia seu empenho e concentração durante as sessões?</div>
          <div className="emoji-row">
            {['😞','😕','😐','🙂','😄'].map((e, i) => (
              <button key={i} className={`emoji-btn${form.intensity === String(i+1) ? ' sel' : ''}`} onClick={() => setF('intensity', String(i+1))}>{e}</button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 10, color: '#aaa' }}>Sem foco</span>
            <span style={{ fontSize: 10, color: '#aaa' }}>Totalmente focada</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Dor ou desconforto físico</div>
          <div className="card-sub">Sentiu alguma dor ou desconforto durante ou após os treinos?</div>
          <div className="tog-row" style={{ flexWrap: 'wrap', gap: 6 }}>
            {[
              { val: '0', label: 'Não senti nada' },
              { val: '1', label: 'Desconforto leve — não atrapalhou' },
              { val: '2', label: 'Dor que limitou o treino' },
            ].map(({ val, label }) => (
              <button
                key={val}
                className={`tog${form.pain === val ? ' sel' : ''}`}
                style={{ flex: 'none', width: '100%', marginBottom: 2, textAlign: 'left', paddingLeft: 12 }}
                onClick={() => setF('pain', val)}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Alimentação geral</div>
          <div className="card-sub">Como foi sua alimentação nesses 3 dias?</div>
          <div className="emoji-row">
            {['😞','😕','😐','🙂','😄'].map((e, i) => (
              <button key={i} className={`emoji-btn${form.food === String(i+1) ? ' sel' : ''}`} onClick={() => setF('food', String(i+1))}>{e}</button>
            ))}
          </div>
          <textarea
            className="ctx-area"
            placeholder="O que influenciou sua alimentação nesses dias? (opcional)"
            value={form.foodCtx}
            onChange={e => setF('foodCtx', e.target.value)}
          />
        </div>

        <div className="card">
          <div className="card-title">Hidratação — 2L por dia</div>
          <div className="card-sub">Em quantos dos 3 dias você atingiu 2L de água?</div>
          <div className="tog-row">
            {['0','1','2','3'].map(v => (
              <button key={v} className={`tog${form.water === v ? ' sel' : ''}`} onClick={() => setF('water', v)}>{v} {v==='1'?'dia':'dias'}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Sono e energia</div>
          <div className="card-sub">Como foram seu sono e disposição nesses 3 dias?</div>
          <div className="emoji-row">
            {['😞','😕','😐','🙂','😄'].map((e, i) => (
              <button key={i} className={`emoji-btn${form.sleep === String(i+1) ? ' sel' : ''}`} onClick={() => setF('sleep', String(i+1))}>{e}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Atividade extra</div>
          <div className="card-sub">Fez alguma atividade além da musculação nesses dias?</div>
          <div className="tog-row">
            <button className={`tog${form.extra === 'Sim' ? ' sel' : ''}`} onClick={() => setF('extra', 'Sim')}>Sim</button>
            <button className={`tog${form.extra === 'Não' ? ' sel' : ''}`} onClick={() => setF('extra', 'Não')}>Não</button>
          </div>
          {form.extra === 'Sim' && (
            <div className="tag-wrap" style={{ marginTop: 10 }}>
              {ACTIVITIES.map(a => (
                <button key={a} className={`tog-sm${form.activities.includes(a) ? ' sel' : ''}`} onClick={() => toggleActivity(a)}>{a}</button>
              ))}
            </div>
          )}
        </div>

        <button className="btn-main" onClick={submit}>Salvar registro</button>
      </div>
    </div>
  );
}
