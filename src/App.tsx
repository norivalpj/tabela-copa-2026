/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, LayoutGrid, ChevronRight, Medal, Circle, MapPin, ChevronDown, ChevronUp, BarChart2, Target, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

import { Bolao } from './components/Bolao';
import { CountryFlag } from './components/CountryFlag';
import { AdBanner } from './components/AdBanner';

import { INITIAL_MATCHES, GROUPS, KNOCKOUT_ROUNDS, SCORERS, HOST_CITIES } from './data';

// --- COMPONENTS ---

function GroupTable({ group }: { group: typeof GROUPS[0], key?: React.Key }) {
  const [showChart, setShowChart] = useState(false);

  const chartData = group.teams.map(t => ({
    name: t.name,
    Vitórias: t.w,
    Empates: t.d,
    Derrotas: t.l
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
      <div className="bg-emerald-800 text-white px-4 py-3 font-semibold text-sm flex justify-between items-center">
        <span>{group.name}</span>
        <ChevronRight size={16} className="opacity-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Seleção</th>
              <th className="px-2 py-3 font-medium text-center" title="Pontos">P</th>
              <th className="px-2 py-3 font-medium text-center" title="Jogos">J</th>
              <th className="px-2 py-3 font-medium text-center" title="Vitórias">V</th>
              <th className="px-2 py-3 font-medium text-center" title="Empates">E</th>
              <th className="px-2 py-3 font-medium text-center" title="Derrotas">D</th>
              <th className="px-2 py-3 font-medium text-center" title="Saldo de Gols">SG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {group.teams.map((team, index) => (
              <motion.tr 
                key={team.id} 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={index < 2 ? 'bg-emerald-50/30' : 'bg-white'}
              >
                <td className="px-4 py-3 flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-4">{index + 1}</span>
                  <motion.span 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="cursor-default inline-flex items-center origin-center"
                  >
                    <CountryFlag code={team.flag} />
                  </motion.span>
                  <span className="font-medium text-gray-900 truncate max-w-[100px]">{team.name}</span>
                </td>
                <td className="px-2 py-3 text-center font-bold text-gray-900">{team.pts}</td>
                <td className="px-2 py-3 text-center text-gray-500">{team.p}</td>
                <td className="px-2 py-3 text-center text-gray-500">{team.w}</td>
                <td className="px-2 py-3 text-center text-gray-500">{team.d}</td>
                <td className="px-2 py-3 text-center text-gray-500">{team.l}</td>
                <td className="px-2 py-3 text-center text-gray-500">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div 
        className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-center cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm text-emerald-700 font-medium"
        onClick={() => setShowChart(!showChart)}
      >
        <BarChart2 size={16} />
        {showChart ? 'Ocultar Gráfico' : 'Ver Gráfico de Desempenho'}
      </div>

      <AnimatePresence>
        {showChart && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white"
          >
            <div className="p-4 pt-6 h-64 border-t border-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
                  <Bar dataKey="Vitórias" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Empates" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Derrotas" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MatchCard({ match }: { match: typeof INITIAL_MATCHES[0], key?: React.Key }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFinished = match.status === 'Finalizado';
  const isLive = match.status === 'Em andamento';
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border mb-4 transition-colors overflow-hidden ${isLive ? 'border-red-200 bg-red-50/10' : 'border-gray-100'} ${match.status !== 'A iniciar' ? 'cursor-pointer hover:border-emerald-300' : ''}`}
      onClick={() => { if (match.status !== 'A iniciar') setIsExpanded(!isExpanded); }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 text-xs font-medium">
          <span className="text-gray-500">{match.date} • {match.time}</span>
          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
            isFinished ? 'bg-gray-100 text-gray-600' : 
            isLive ? 'bg-red-100 text-red-700 animate-pulse' : 
            'bg-emerald-100 text-emerald-700'
          }`}>
            {isLive && <Circle size={8} className="fill-red-600" />}
            {match.status}
          </span>
        </div>
        
        {match.location && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
            <MapPin size={12} />
            <span>{match.location}</span>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <motion.span 
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="cursor-default inline-flex items-center origin-center"
              >
                <CountryFlag code={match.flag1} />
              </motion.span>
              <span className="font-semibold text-gray-900">{match.team1}</span>
            </div>
            <motion.span 
              key={match.score1}
              initial={isLive ? { scale: 1.5, color: '#10b981' } : false}
              animate={{ scale: 1, color: isFinished || isLive ? '#111827' : '#d1d5db' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`text-xl font-bold ${isFinished || isLive ? 'text-gray-900' : 'text-gray-300'}`}
            >
              {match.score1 !== null ? match.score1 : '-'}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <motion.span 
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="cursor-default inline-flex items-center origin-center"
              >
                <CountryFlag code={match.flag2} />
              </motion.span>
              <span className="font-semibold text-gray-900">{match.team2}</span>
            </div>
            <motion.span 
              key={match.score2}
              initial={isLive ? { scale: 1.5, color: '#10b981' } : false}
              animate={{ scale: 1, color: isFinished || isLive ? '#111827' : '#d1d5db' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`text-xl font-bold ${isFinished || isLive ? 'text-gray-900' : 'text-gray-300'}`}
            >
              {match.score2 !== null ? match.score2 : '-'}
            </motion.span>
          </div>
        </div>

        {match.status !== 'A iniciar' && (
          <div className="mt-3 flex justify-center text-gray-400">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && match.status !== 'A iniciar' && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 text-center">Estatísticas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 w-12 text-right">{Math.floor(Math.random() * 30 + 35)}%</span>
                    <span className="text-gray-500 text-[11px] uppercase tracking-wider">Posse de Bola</span>
                    <span className="font-semibold text-gray-800 w-12">{Math.floor(Math.random() * 30 + 35)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 w-12 text-right">{Math.floor(Math.random() * 10 + 2)}</span>
                    <span className="text-gray-500 text-[11px] uppercase tracking-wider">Chutes a Gol</span>
                    <span className="font-semibold text-gray-800 w-12">{Math.floor(Math.random() * 10 + 2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 w-12 text-right">{Math.floor(Math.random() * 15 + 5)}</span>
                    <span className="text-gray-500 text-[11px] uppercase tracking-wider">Faltas</span>
                    <span className="font-semibold text-gray-800 w-12">{Math.floor(Math.random() * 15 + 5)}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-3 text-center">Escalações Provisórias</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-gray-800 text-xs text-center border-b pb-1 mb-2 truncate">{match.team1}</div>
                    <ul className="text-xs text-gray-600 space-y-1 text-center font-medium">
                      <li>Goleiro Titular</li>
                      <li>Lateral Direito</li>
                      <li>Zagueiro 1</li>
                      <li>Zagueiro 2</li>
                      <li>Lateral Esquerdo</li>
                      <li>Volante 1</li>
                      <li>Volante 2</li>
                      <li>Meia Atacante</li>
                      <li>Ponta Direita</li>
                      <li>Centroavante</li>
                      <li>Ponta Esquerda</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs text-center border-b pb-1 mb-2 truncate">{match.team2}</div>
                    <ul className="text-xs text-gray-600 space-y-1 text-center font-medium">
                      <li>Goleiro Titular</li>
                      <li>Lateral Direito</li>
                      <li>Zagueiro 1</li>
                      <li>Zagueiro 2</li>
                      <li>Lateral Esquerdo</li>
                      <li>Volante 1</li>
                      <li>Volante 2</li>
                      <li>Meia Atacante</li>
                      <li>Ponta Direita</li>
                      <li>Centroavante</li>
                      <li>Ponta Esquerda</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN APP ---

import { LanguageContext, useTranslation, translations } from './i18n';

export default function AppWrapper() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  
  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      t: (key) => translations[lang]?.[key] || key
    }}>
      <App />
    </LanguageContext.Provider>
  );
}

function App() {
  const { t, lang, setLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'groups' | 'matches' | 'knockout' | 'scorers' | 'cities' | 'bolao'>('groups');
  const [matches, setMatches] = useState(INITIAL_MATCHES);

  const dynamicGroups = React.useMemo(() => {
    const newGroups = GROUPS.map(g => ({
      ...g,
      teams: g.teams.map(t => ({ ...t, pts: 0, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0 }))
    }));

    const teamStats: Record<string, any> = {};
    newGroups.forEach(g => g.teams.forEach(t => { teamStats[t.name] = t; }));

    matches.forEach(m => {
      if (m.status === 'Finalizado' || m.status === 'Em andamento') {
        const t1 = teamStats[m.team1];
        const t2 = teamStats[m.team2];
        
        if (t1 && t2 && m.score1 !== null && m.score2 !== null) {
          // We only count it as a played match if it's finished, but for live standings we can count it
          // Let's count it as played if it has started
          t1.p += 1;
          t2.p += 1;
          t1.gf += m.score1;
          t1.ga += m.score2;
          t2.gf += m.score2;
          t2.ga += m.score1;
          
          if (m.score1 > m.score2) {
            t1.w += 1;
            t1.pts += 3;
            t2.l += 1;
          } else if (m.score1 < m.score2) {
            t2.w += 1;
            t2.pts += 3;
            t1.l += 1;
          } else {
            t1.d += 1;
            t2.d += 1;
            t1.pts += 1;
            t2.pts += 1;
          }
        }
      }
    });

    newGroups.forEach(g => {
      g.teams.forEach(t => { t.gd = t.gf - t.ga; });
      g.teams.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });
    });

    return newGroups;
  }, [matches]);

  // Live score simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setMatches(currentMatches => 
        currentMatches.map(match => {
          if (match.status === 'Em andamento') {
            // 5% chance of scoring every 3 seconds for simulation
            const random = Math.random();
            if (random < 0.05) return { ...match, score1: (match.score1 || 0) + 1 };
            if (random > 0.95) return { ...match, score2: (match.score2 || 0) + 1 };
          }
          return match;
        })
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-900 md:p-6 lg:p-8">
      {/* Responsive Container */}
      <div className="w-full max-w-[1200px] bg-gray-50 min-h-screen md:min-h-0 md:rounded-3xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-emerald-900 text-white flex-shrink-0">
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Mundial 26</h1>
                <p className="text-emerald-200 text-sm mt-2 opacity-80">{t('follow_table')}</p>
              </div>
              <button
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 transition"
              >
                <Globe size={16} />
                <span className="text-sm font-semibold uppercase">{lang}</span>
              </button>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <button onClick={() => setActiveTab('groups')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'groups' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <LayoutGrid size={20} className={activeTab === 'groups' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
              <span>{t('groups')}</span>
            </button>
            <button onClick={() => setActiveTab('matches')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'matches' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <Calendar size={20} className={activeTab === 'matches' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
              <span>{t('matches')}</span>
            </button>
            <button onClick={() => setActiveTab('knockout')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'knockout' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <Trophy size={20} className={activeTab === 'knockout' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
              <span>{t('knockout')}</span>
            </button>
            <button onClick={() => setActiveTab('scorers')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'scorers' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <Medal size={20} className={activeTab === 'scorers' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
              <span>{t('scorers')}</span>
            </button>
            <button onClick={() => setActiveTab('cities')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'cities' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <MapPin size={20} className={activeTab === 'cities' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
              <span>{t('cities')}</span>
            </button>
            <button onClick={() => setActiveTab('bolao')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === 'bolao' ? 'bg-emerald-800 text-white font-semibold shadow-inner' : 'text-emerald-100 hover:bg-emerald-800/50'}`}>
              <div className="relative">
                <Target size={20} className={activeTab === 'bolao' ? 'fill-emerald-50 text-emerald-50' : 'text-emerald-200'} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-emerald-900"></div>
              </div>
              <span>{t('pool')}</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Header */}
        <header className="md:hidden bg-emerald-800 text-white pt-safe pb-4 px-6 sticky top-0 z-10 shadow-md flex justify-between items-end">
          <div className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight">Mundial 26</h1>
            <p className="text-emerald-200 text-sm mt-1">{t('follow_table')}</p>
          </div>
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition"
          >
            <Globe size={16} />
            <span className="text-sm font-semibold uppercase">{lang}</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-24 md:pb-8 bg-[#f8fafc]">
          
          <div className="max-w-4xl mx-auto mb-6">
            <AdBanner className="w-full h-auto min-h-[90px]" />
          </div>

          {activeTab === 'groups' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">Fase de Grupos (12 Grupos)</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {dynamicGroups.map((group) => (
                  <GroupTable key={group.name} group={group} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">Jogos</h2>
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          {activeTab === 'knockout' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">Mata-mata</h2>
              {KNOCKOUT_ROUNDS.map((round) => (
                <div key={round.name} className="mb-8">
                  <h3 className="text-sm font-semibold text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-md inline-block uppercase tracking-wider mb-4">{round.name}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {round.matches.map(match => (
                      <MatchCard key={match.id} match={match as any} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'scorers' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">Artilharia</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold w-12 text-center">#</th>
                      <th className="px-6 py-4 font-semibold">Jogador</th>
                      <th className="px-6 py-4 font-semibold text-center">Gols</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <AnimatePresence>
                      {SCORERS.map((scorer, index) => (
                        <motion.tr 
                          key={scorer.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-5 text-center text-gray-400 font-medium">{index + 1}</td>
                          <td className="px-6 py-5 flex items-center gap-4">
                            <motion.span 
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="cursor-default inline-flex items-center origin-center"
                            >
                              <CountryFlag code={scorer.flag} />
                            </motion.span>
                            <div>
                              <div className="font-semibold text-gray-900 text-base">{scorer.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{scorer.team}</div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center font-bold text-emerald-700 text-xl">{scorer.goals}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'cities' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">Cidades-Sede</h2>
              <div className="flex flex-col gap-10">
                {HOST_CITIES.map((host) => (
                  <div key={host.country}>
                    <div className="flex items-center gap-3 mb-5 px-1 border-b border-gray-200 pb-3">
                      <CountryFlag code={host.flag} />
                      <h3 className="font-bold text-gray-900 text-xl">{host.country}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {host.cities.map(city => (
                        <div key={city.name} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                          <div className="h-48 w-full relative">
                            <img 
                              src={city.img} 
                              alt={city.stadium} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h4 className="font-bold text-xl leading-tight text-shadow-sm">{city.name}</h4>
                              <p className="text-sm text-gray-200 mt-1 opacity-90">{city.stadium}</p>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-white flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Capacidade</span>
                            <span className="font-bold text-gray-800">{city.capacity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bolao' && <div className="max-w-3xl mx-auto"><Bolao /></div>}
        </main>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 w-full py-2 flex justify-around items-center pb-safe z-[999] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] overflow-x-auto no-scrollbar">
          <div className="flex justify-around items-center w-full min-w-[360px] px-2 gap-1">
            <button 
              onClick={() => setActiveTab('groups')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'groups' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={22} className={activeTab === 'groups' ? 'fill-emerald-50' : ''} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Grupos</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('matches')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'matches' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Calendar size={22} className={activeTab === 'matches' ? 'fill-emerald-50' : ''} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Jogos</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('knockout')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'knockout' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Trophy size={22} className={activeTab === 'knockout' ? 'fill-emerald-50' : ''} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Finais</span>
            </button>

            <button 
              onClick={() => setActiveTab('scorers')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'scorers' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Medal size={22} className={activeTab === 'scorers' ? 'fill-emerald-50' : ''} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Gols</span>
            </button>

            <button 
              onClick={() => setActiveTab('cities')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'cities' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <MapPin size={22} className={activeTab === 'cities' ? 'fill-emerald-50' : ''} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Sedes</span>
            </button>

            <button 
              onClick={() => setActiveTab('bolao')}
              className={`flex flex-col items-center gap-1 w-12 flex-shrink-0 ${activeTab === 'bolao' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="relative">
                <Target size={22} className={activeTab === 'bolao' ? 'fill-emerald-50' : ''} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white flex items-center justify-center"></div>
              </div>
              <span className="text-[9px] font-medium uppercase tracking-wider text-center w-full truncate">Bolão</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
