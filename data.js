export const LEVELS = [
  { name: 'Iniciante',    min: 0,    max: 300  },
  { name: 'Em Movimento', min: 301,  max: 700  },
  { name: 'Consistente',  min: 701,  max: 1200 },
  { name: 'Avançada',     min: 1201, max: 2000 },
  { name: 'Elite',        min: 2001, max: 99999 },
];

export const MISSIONS = [
  { domain: 'sono',        text: 'Dormir 30 minutos mais cedo do que o habitual — em pelo menos 5 dos próximos 7 dias.' },
  { domain: 'sono',        text: 'Criar uma rotina de 10 minutos antes de dormir — sem tela, mesma sequência todo dia.' },
  { domain: 'sono',        text: 'Desligar tela 30 minutos antes de dormir — em pelo menos 5 dos próximos 7 dias.' },
  { domain: 'estresse',    text: 'Fazer 5 minutos de respiração consciente antes de dormir — por 5 dias seguidos.' },
  { domain: 'estresse',    text: 'Identificar 1 compromisso da semana que pode eliminar ou delegar sem impacto real.' },
  { domain: 'alimentação', text: 'Antes de comer fora do planejado: esperar 5 minutos e beber um copo de água.' },
  { domain: 'alimentação', text: 'Preparar o lanche da tarde com antecedência em 4 dos próximos 7 dias.' },
  { domain: 'alimentação', text: 'Beber 2 litros de água por dia — marcar no celular cada vez que completar 500ml.' },
  { domain: 'organização', text: 'Separar a roupa de treino na noite anterior — por 7 dias seguidos.' },
  { domain: 'organização', text: 'No domingo, definir o horário exato do treino de cada dia da semana.' },
  { domain: 'treino',      text: 'Completar todas as sessões planejadas — mesmo que precise reduzir a duração.' },
  { domain: 'treino',      text: 'Registrar a percepção de esforço em cada sessão — de 1 a 10.' },
];

export const CONQUESTS = [
  { id: 'first_mission',   label: 'Primeira missão',   icon: 'star',          condition: s => s.missionsCompleted >= 1 },
  { id: 'three_in_row',    label: '3 seguidas',         icon: 'flame',         condition: s => s.streak >= 3 },
  { id: 'thirty_days',     label: '30 dias',            icon: 'calendar-check',condition: s => s.totalDays >= 10 },
  { id: 'stable_domain',   label: 'Domínio estável',    icon: 'trophy',        condition: s => s.domainsStabilized >= 1 },
];

export const DOMAIN_HIERARCHY = ['sono', 'estresse', 'alimentação', 'organização', 'treino', 'autopercepção'];

export function getLevel(pts) {
  for (let i = 0; i < LEVELS.length; i++) {
    if (pts <= LEVELS[i].max) return { level: LEVELS[i], index: i };
  }
  return { level: LEVELS[LEVELS.length - 1], index: LEVELS.length - 1 };
}

export function getNextMission(checkinData) {
  const scores = {
    sono:          checkinData.sleep   || 3,
    estresse:      checkinData.stress  || 3,
    alimentação:   checkinData.food    || 3,
    organização:   checkinData.train   || 3,
    treino:        checkinData.train   || 3,
    autopercepção: checkinData.self    || 3,
  };
  let criticalDomain = DOMAIN_HIERARCHY[0];
  let minScore = 999;
  DOMAIN_HIERARCHY.forEach(d => {
    const s = scores[d] || 3;
    if (s < minScore) { minScore = s; criticalDomain = d; }
  });
  const candidates = MISSIONS.filter(m => m.domain === criticalDomain);
  return candidates[Math.floor(Math.random() * candidates.length)] || MISSIONS[0];
}

export function calcDailyPoints({ gym, food, water, sleep, extra }) {
  let pts = 0;
  pts += (parseInt(gym)  || 0) * 20;
  pts += (parseInt(food) || 0) * 8;
  pts += (parseInt(water)|| 0) * 8;
  pts += (parseInt(sleep)|| 0) * 6;
  if (extra === 'Sim') pts += 20;
  return Math.min(pts, 130);
}

export function calcCheckinPoints(prevMissionStatus) {
  if (prevMissionStatus === 'Cumpri')      return 100;
  if (prevMissionStatus === 'Parcial')     return 50;
  return 0;
}

export function getInitialState() {
  const saved = localStorage.getItem('app3a_state');
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  return {
    pts: 0,
    streak: 0,
    totalDays: 0,
    missionsCompleted: 0,
    domainsStabilized: 0,
    chartData: [],
    currentMission: MISSIONS[0],
    lastCheckin: null,
    lastDaily: null,
    history: [],
  };
}

export function saveState(state) {
  localStorage.setItem('app3a_state', JSON.stringify(state));
}
