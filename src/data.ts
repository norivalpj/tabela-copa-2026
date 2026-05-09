export const createTeam = (id: string, name: string, flag: string, pts=0, p=0, w=0, d=0, l=0, gf=0, ga=0) => ({
  id, name, flag, pts, p, w, d, l, gf, ga, gd: gf - ga
});

export const GROUPS = [
  { name: 'Grupo A', teams: [createTeam('mex', 'México', 'mx', 0, 0, 0, 0, 0, 0, 0), createTeam('srb', 'Sérvia', 'rs', 0, 0, 0, 0, 0, 0, 0), createTeam('mli', 'Mali', 'ml', 0, 0, 0, 0, 0, 0, 0), createTeam('irq', 'Iraque', 'iq', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo B', teams: [createTeam('can', 'Canadá', 'ca', 0, 0, 0, 0, 0, 0, 0), createTeam('den', 'Dinamarca', 'dk', 0, 0, 0, 0, 0, 0, 0), createTeam('ecu', 'Equador', 'ec', 0, 0, 0, 0, 0, 0, 0), createTeam('ksa', 'A. Saudita', 'sa', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo C', teams: [createTeam('usa', 'EUA', 'us', 0, 0, 0, 0, 0, 0, 0), createTeam('ukr', 'Ucrânia', 'ua', 0, 0, 0, 0, 0, 0, 0), createTeam('rsa', 'Áf. do Sul', 'za', 0, 0, 0, 0, 0, 0, 0), createTeam('uzb', 'Uzbequistão', 'uz', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo D', teams: [createTeam('arg', 'Argentina', 'ar', 0, 0, 0, 0, 0, 0, 0), createTeam('tur', 'Turquia', 'tr', 0, 0, 0, 0, 0, 0, 0), createTeam('nga', 'Nigéria', 'ng', 0, 0, 0, 0, 0, 0, 0), createTeam('pan', 'Panamá', 'pa', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo E', teams: [createTeam('bra', 'Brasil', 'br', 0, 0, 0, 0, 0, 0, 0), createTeam('sui', 'Suíça', 'ch', 0, 0, 0, 0, 0, 0, 0), createTeam('gha', 'Gana', 'gh', 0, 0, 0, 0, 0, 0, 0), createTeam('qat', 'Catar', 'qa', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo F', teams: [createTeam('fra', 'França', 'fr', 0, 0, 0, 0, 0, 0, 0), createTeam('uru', 'Uruguai', 'uy', 0, 0, 0, 0, 0, 0, 0), createTeam('civ', 'C. do Marfim', 'ci', 0, 0, 0, 0, 0, 0, 0), createTeam('jam', 'Jamaica', 'jm', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo G', teams: [createTeam('eng', 'Inglaterra', 'gb-eng', 0, 0, 0, 0, 0, 0, 0), createTeam('col', 'Colômbia', 'co', 0, 0, 0, 0, 0, 0, 0), createTeam('egy', 'Egito', 'eg', 0, 0, 0, 0, 0, 0, 0), createTeam('irn', 'Irã', 'ir', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo H', teams: [createTeam('esp', 'Espanha', 'es', 0, 0, 0, 0, 0, 0, 0), createTeam('ven', 'Venezuela', 've', 0, 0, 0, 0, 0, 0, 0), createTeam('cmr', 'Camarões', 'cm', 0, 0, 0, 0, 0, 0, 0), createTeam('aus', 'Austrália', 'au', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo I', teams: [createTeam('por', 'Portugal', 'pt', 0, 0, 0, 0, 0, 0, 0), createTeam('par', 'Paraguai', 'py', 0, 0, 0, 0, 0, 0, 0), createTeam('dza', 'Argélia', 'dz', 0, 0, 0, 0, 0, 0, 0), createTeam('kor', 'C. do Sul', 'kr', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo J', teams: [createTeam('bel', 'Bélgica', 'be', 0, 0, 0, 0, 0, 0, 0), createTeam('cro', 'Croácia', 'hr', 0, 0, 0, 0, 0, 0, 0), createTeam('sen', 'Senegal', 'sn', 0, 0, 0, 0, 0, 0, 0), createTeam('crc', 'Costa Rica', 'cr', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo K', teams: [createTeam('ger', 'Alemanha', 'de', 0, 0, 0, 0, 0, 0, 0), createTeam('pol', 'Polônia', 'pl', 0, 0, 0, 0, 0, 0, 0), createTeam('mar', 'Marrocos', 'ma', 0, 0, 0, 0, 0, 0, 0), createTeam('nzl', 'Nova Zelândia', 'nz', 0, 0, 0, 0, 0, 0, 0)] },
  { name: 'Grupo L', teams: [createTeam('ita', 'Itália', 'it', 0, 0, 0, 0, 0, 0, 0), createTeam('ned', 'Holanda', 'nl', 0, 0, 0, 0, 0, 0, 0), createTeam('jpn', 'Japão', 'jp', 0, 0, 0, 0, 0, 0, 0), createTeam('aut', 'Áustria', 'at', 0, 0, 0, 0, 0, 0, 0)] },
];

export const INITIAL_MATCHES = [
  { id: 1, date: '11 Jun 2026', time: '12:00', team1: 'México', flag1: 'mx', score1: 0, team2: 'Sérvia', flag2: 'rs', score2: 0, status: 'A iniciar', location: 'Estádio Azteca, Cidade do México' },
  { id: 2, date: '11 Jun 2026', time: '16:00', team1: 'Mali', flag1: 'ml', score1: 0, team2: 'Iraque', flag2: 'iq', score2: 0, status: 'A iniciar', location: 'Estádio Guadalajara' },
  { id: 3, date: '12 Jun 2026', time: '12:00', team1: 'Canadá', flag1: 'ca', score1: 0, team2: 'Dinamarca', flag2: 'dk', score2: 0, status: 'A iniciar', location: 'Estádio Toronto' },
  { id: 4, date: '12 Jun 2026', time: '15:00', team1: 'EUA', flag1: 'us', score1: 0, team2: 'Ucrânia', flag2: 'ua', score2: 0, status: 'A iniciar', location: 'Estádio Los Angeles' },
  { id: 5, date: '12 Jun 2026', time: '18:00', team1: 'Equador', flag1: 'ec', score1: 0, team2: 'A. Saudita', flag2: 'sa', score2: 0, status: 'A iniciar', location: 'Estádio BC Place, Vancouver' },
  { id: 6, date: '13 Jun 2026', time: '15:00', team1: 'Brasil', flag1: 'br', score1: 0, team2: 'Suíça', flag2: 'ch', score2: 0, status: 'A iniciar', location: 'MetLife Stadium, Nova York/NJ' },
];

export const KNOCKOUT_ROUNDS = [
  {
    name: '16-avos de Final',
    matches: [
      { id: 101, date: '28 Jun 2026', team1: '1º Grupo A', flag1: '🏳️', score1: null, team2: '3º Grupo C/D/E', flag2: '🏳️', score2: null, status: 'A iniciar' },
      { id: 102, date: '28 Jun 2026', team1: '2º Grupo B', flag1: '🏳️', score1: null, team2: '2º Grupo F', flag2: '🏳️', score2: null, status: 'A iniciar' },
      { id: 103, date: '29 Jun 2026', team1: '1º Grupo C', flag1: '🏳️', score1: null, team2: '3º Grupo A/B/F', flag2: '🏳️', score2: null, status: 'A iniciar' },
      { id: 104, date: '29 Jun 2026', team1: '1º Grupo E', flag1: '🏳️', score1: null, team2: '3º Grupo G/H/I', flag2: '🏳️', score2: null, status: 'A iniciar' },
    ]
  },
  {
    name: 'Oitavas de Final',
    matches: [
      { id: 201, date: '04 Jul 2026', team1: 'Vencedor 101', flag1: '🏳️', score1: null, team2: 'Vencedor 102', flag2: '🏳️', score2: null, status: 'A iniciar' },
      { id: 202, date: '04 Jul 2026', team1: 'Vencedor 103', flag1: '🏳️', score1: null, team2: 'Vencedor 104', flag2: '🏳️', score2: null, status: 'A iniciar' },
    ]
  },
  {
    name: 'Quartas de Final',
    matches: [
      { id: 301, date: '09 Jul 2026', team1: 'Vencedor 201', flag1: '🏳️', score1: null, team2: 'Vencedor 202', flag2: '🏳️', score2: null, status: 'A iniciar' },
    ]
  },
  {
    name: 'Semifinal',
    matches: [
      { id: 401, date: '14 Jul 2026', team1: 'Vencedor 301', flag1: '🏳️', score1: null, team2: 'Vencedor 302', flag2: '🏳️', score2: null, status: 'A iniciar' },
    ]
  },
  {
    name: 'Final',
    matches: [
      { id: 501, date: '19 Jul 2026', team1: 'Vencedor 401', flag1: '🏳️', score1: null, team2: 'Vencedor 402', flag2: '🏳️', score2: null, status: 'A iniciar' },
    ]
  }
];

export const SCORERS = [
  { id: 1, name: 'K. Mbappé', team: 'França', flag: 'fr', goals: 6 },
  { id: 2, name: 'Vini Jr.', team: 'Brasil', flag: 'br', goals: 5 },
  { id: 3, name: 'H. Kane', team: 'Inglaterra', flag: 'gb-eng', goals: 4 },
  { id: 4, name: 'L. Messi', team: 'Argentina', flag: 'ar', goals: 3 },
  { id: 5, name: 'J. Bellingham', team: 'Inglaterra', flag: 'gb-eng', goals: 3 },
  { id: 6, name: 'R. Leão', team: 'Portugal', flag: 'pt', goals: 2 },
  { id: 7, name: 'J. Musiala', team: 'Alemanha', flag: 'de', goals: 2 },
];

export const HOST_CITIES = [
  { 
    country: 'Canadá', flag: 'ca', 
    cities: [
      { name: 'Toronto', stadium: 'BMO Field', capacity: '45.000', img: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80' },
      { name: 'Vancouver', stadium: 'BC Place', capacity: '54.500', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80' }
    ] 
  },
  { 
    country: 'México', flag: 'mx', 
    cities: [
      { name: 'Cidade do México', stadium: 'Estádio Azteca', capacity: '83.264', img: 'https://images.unsplash.com/photo-1518605368461-1e1e1fd12198?w=800&q=80' },
      { name: 'Guadalajara', stadium: 'Estádio Akron', capacity: '48.071', img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&q=80' },
      { name: 'Monterrey', stadium: 'Estádio BBVA', capacity: '53.500', img: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800&q=80' }
    ] 
  },
  { 
    country: 'Estados Unidos', flag: 'us', 
    cities: [
      { name: 'Nova York/NJ', stadium: 'MetLife Stadium', capacity: '82.500', img: 'https://images.unsplash.com/photo-1495563923587-bdc4282494d0?w=800&q=80' },
      { name: 'Los Angeles', stadium: 'SoFi Stadium', capacity: '70.240', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80' },
      { name: 'Dallas', stadium: 'AT&T Stadium', capacity: '80.000', img: 'https://images.unsplash.com/photo-1518605368461-1e1e1fd12198?w=800&q=80' },
      { name: 'Miami', stadium: 'Hard Rock Stadium', capacity: '64.767', img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&q=80' },
      { name: 'Atlanta', stadium: 'Mercedes-Benz Stadium', capacity: '71.000', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80' }
    ] 
  }
];
