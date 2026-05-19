import React from 'react';

export default function MiniChart({ data = [], labels = [], highlightLast = false }) {
  if (!data.length) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', fontSize: 13 }}>
      Nenhum dado ainda
    </div>
  );
  const max = Math.max(...data) || 1;
  return (
    <div className="chart-bars">
      {data.map((v, i) => {
        const h = Math.round((v / max) * 100);
        const isLast = highlightLast && i === data.length - 1;
        return (
          <div key={i} className="bar-col">
            <div className={`bar-body${isLast ? ' current' : ''}`} style={{ height: `${h}%` }} />
            <div className="bar-lbl">{labels[i] || `R${i+1}`}</div>
          </div>
        );
      })}
    </div>
  );
}
