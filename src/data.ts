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
  { id: 1, name: 'K. Mbappé', team: 'França', flag: 'fr', goals: 0 },
  { id: 2, name: 'Vini Jr.', team: 'Brasil', flag: 'br', goals: 0 },
  { id: 3, name: 'H. Kane', team: 'Inglaterra', flag: 'gb-eng', goals: 0 },
  { id: 4, name: 'L. Messi', team: 'Argentina', flag: 'ar', goals: 0 },
  { id: 5, name: 'J. Bellingham', team: 'Inglaterra', flag: 'gb-eng', goals: 0 },
  { id: 6, name: 'R. Leão', team: 'Portugal', flag: 'pt', goals: 0 },
  { id: 7, name: 'J. Musiala', team: 'Alemanha', flag: 'de', goals: 0 },
];

export const HOST_CITIES = [
  { 
    country: 'Canadá', flag: 'ca', 
    cities: [
      { name: 'Toronto', stadium: 'BMO Field', capacity: '45.000', matchesHosted: 6, info: 'Localizado no Exhibition Place, expandido especialmente para a Copa do Mundo.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/9/91/Toronto_BMO_Field_in_2024.jpg&w=800&h=500&fit=cover' },
      { name: 'Vancouver', stadium: 'BC Place', capacity: '54.500', matchesHosted: 7, info: 'Conhecido por seu telão central gigante e teto retrátil.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/f/ff/BC_Place_2015_Women%2527s_FIFA_World_Cup.jpg&w=800&h=500&fit=cover' }
    ] 
  },
  { 
    country: 'México', flag: 'mx', 
    cities: [
      { name: 'Cidade do México', stadium: 'Estádio Azteca', capacity: '83.264', matchesHosted: 5, info: 'Primeiro estádio a sediar a abertura (e jogos) em três Copas do Mundo diferentes (1970, 1986, 2026).', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/0/07/Vista_a%25C3%25A9rea_del_Estadio_Azteca_-_2026_-_02.jpg&w=800&h=500&fit=cover' },
      { name: 'Guadalajara', stadium: 'Estádio Akron', capacity: '48.071', matchesHosted: 4, info: 'Famoso pelo seu formato de vulcão, perfeitamente integrado à paisagem natural.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/10/Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_%283%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Monterrey', stadium: 'Estádio BBVA', capacity: '53.500', matchesHosted: 4, info: 'Apelidado de "O Gigante de Aço", oferece vistas deslumbrantes da montanha Cerro de la Silla.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/5/57/Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG&w=800&h=500&fit=cover' }
    ] 
  },
  { 
    country: 'Estados Unidos', flag: 'us', 
    cities: [
      { name: 'Nova York/NJ', stadium: 'MetLife Stadium', capacity: '82.500', matchesHosted: 8, info: 'O palco da grande Final da Copa do Mundo FIFA 26.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/0/04/Metlife_stadium_%28Aerial_view%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Los Angeles', stadium: 'SoFi Stadium', capacity: '70.240', matchesHosted: 8, info: 'O estádio mais caro já construído no mundo, com tecnologia de ponta.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b3/SoFi_Stadium_2023.jpg&w=800&h=500&fit=cover' },
      { name: 'Dallas', stadium: 'AT&T Stadium', capacity: '80.000', matchesHosted: 9, info: 'Possui uma das maiores telas e sediará o maior número de jogos no torneio.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/11/Arlington_June_2020_4_%28AT%2526T_Stadium%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Miami', stadium: 'Hard Rock Stadium', capacity: '64.767', matchesHosted: 7, info: 'Sede da final da Copa América 2024 e local de partidas cruciais.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/ce/Hard_Rock_Stadium_for_Super_Bowl_LIV_%2849606710103%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Atlanta', stadium: 'Mercedes-Benz Stadium', capacity: '71.000', matchesHosted: 8, info: 'Conhecido por seu telão 360 graus (Halo Board) e design arrojado.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/10/Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg&w=800&h=500&fit=cover' },
      { name: 'Boston', stadium: 'Gillette Stadium', capacity: '65.878', matchesHosted: 7, info: 'Passou por grandes renovações incluindo o maior placar externo de estádio.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/db/Gillette_Stadium_%28Top_View%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Filadélfia', stadium: 'Lincoln Financial Field', capacity: '69.328', matchesHosted: 6, info: 'Estádio totalmente focado em sustentabilidade e energia renovável.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/a1/Lincoln_Financial_Field_%28Aerial_view%29.jpg&w=800&h=500&fit=cover' },
      { name: 'Houston', stadium: 'NRG Stadium', capacity: '72.220', matchesHosted: 7, info: 'Primeiro estádio da NFL com teto retrátil.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/3/3e/Nrg_stadium.jpg&w=800&h=500&fit=cover' },
      { name: 'Kansas City', stadium: 'Arrowhead Stadium', capacity: '73.019', matchesHosted: 6, info: 'Reconhecido pelo Guinness Book como o estádio aberto mais barulhento do mundo.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/ac/Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg&w=800&h=500&fit=cover' },
      { name: 'Seattle', stadium: 'Lumen Field', capacity: '69.000', matchesHosted: 6, info: 'Local com uma das bases de fãs de futebol mais apaixonadas dos EUA.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/5/53/Qwest_Field_North.jpg&w=800&h=500&fit=cover' },
      { name: 'San Francisco Bay Area', stadium: 'Levi\'s Stadium', capacity: '68.500', matchesHosted: 6, info: 'Um estádio high-tech no coração do Vale do Silício.', img: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/a6/Levi%2527s_Stadium_in_February_2016_prior_to_Super_Bowl_50_%2824398261729%29.jpg&w=800&h=500&fit=cover' }
    ] 
  }
];
