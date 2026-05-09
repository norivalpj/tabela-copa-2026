import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, doc, onSnapshot, serverTimestamp, writeBatch, arrayUnion } from 'firebase/firestore';
import { Auth } from './Auth';
import { Share2, Users, PlusCircle, Check, ChevronRight, Activity, Trophy, X, Save, Copy } from 'lucide-react';
import { INITIAL_MATCHES } from '../data';

import { CountryFlag } from './CountryFlag';

const PredictionRow: React.FC<{ match: any, userPrediction: any, bolaoId: string, userId: string }> = ({ match, userPrediction, bolaoId, userId }) => {
  const [score1, setScore1] = useState(userPrediction?.score1?.toString() || '');
  const [score2, setScore2] = useState(userPrediction?.score2?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Parse match date safely
  const parseMatchDate = (dateStr: string, timeStr: string) => {
    const ptToEn: Record<string, string> = {
      'Jan': 'Jan', 'Fev': 'Feb', 'Mar': 'Mar', 'Abr': 'Apr', 'Mai': 'May', 'Jun': 'Jun',
      'Jul': 'Jul', 'Ago': 'Aug', 'Set': 'Sep', 'Out': 'Oct', 'Nov': 'Nov', 'Dez': 'Dec'
    };
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      parts[1] = ptToEn[parts[1]] || parts[1];
    }
    return new Date(`${parts.join(' ')} ${timeStr}`);
  };

  const matchDate = parseMatchDate(match.date, match.time);
  const hasStarted = new Date() >= matchDate;
  const isEditable = match.status === 'A iniciar' && !hasStarted;

  const handleSave = async () => {
    if (score1 === '' || score2 === '') return;
    setLoading(true);
    try {
      const predId = `${bolaoId}_${match.id}_${userId}`;
      const batch = writeBatch(db);
      batch.set(doc(db, 'predictions', predId), {
        bolaoId,
        matchId: match.id,
        userId,
        score1: Number(score1),
        score2: Number(score2),
        updatedAt: serverTimestamp()
      });
      await batch.commit();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar palpite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-3">
      <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
        <span>{match.date} • {match.time}</span>
        {match.status === 'Finalizado' && <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Finalizado</span>}
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-end items-center gap-3">
          <span className="font-semibold text-gray-800 text-sm">{match.team1}</span>
          <CountryFlag code={match.flag1} className="w-6 h-4" />
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            min="0" max="20"
            value={score1}
            onChange={e => setScore1(e.target.value)}
            disabled={!isEditable}
            className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          />
          <span className="text-gray-400 font-bold">X</span>
          <input 
            type="number" 
            min="0" max="20"
            value={score2}
            onChange={e => setScore2(e.target.value)}
            disabled={!isEditable}
            className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <div className="flex-1 flex justify-start items-center gap-3">
          <CountryFlag code={match.flag2} className="w-6 h-4" />
          <span className="font-semibold text-gray-800 text-sm">{match.team2}</span>
        </div>
      </div>
      {isEditable && (
        <div className="px-4 pb-4 flex justify-between items-center">
          <div className="flex-1">
            {showToast && <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1 transition-opacity duration-300"><Check size={16} /> Palpite salvo!</span>}
          </div>
          <button 
            onClick={handleSave}
            disabled={loading || score1 === '' || score2 === ''}
            className="flex items-center gap-1.5 text-sm font-semibold bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-lg hover:bg-emerald-200 transition disabled:opacity-50"
          >
            <Save size={14} /> {loading ? 'Salvando...' : 'Salvar Palpite'}
          </button>
        </div>
      )}
    </div>
  );
}

function BolaoDetails({ bolaoId, bolaoName, onBack }: { bolaoId: string, bolaoName: string, onBack: () => void }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ranking' | 'predictions' | 'my-predictions'>('ranking');

  useEffect(() => {
    // Fetch members
    const membersRef = collection(db, 'boloes', bolaoId, 'members');
    const unsubscribeMembers = onSnapshot(membersRef, (snapshot) => {
      const m: any[] = [];
      snapshot.forEach(doc => m.push({ id: doc.id, ...doc.data() }));
      setMembers(m);
    }, (error) => console.error(error));

    // Fetch predictions
    const predictionsRef = collection(db, 'predictions');
    const q = query(predictionsRef, where('bolaoId', '==', bolaoId));
    const unsubscribePredictions = onSnapshot(q, (snapshot) => {
      const p: any[] = [];
      snapshot.forEach(doc => p.push({ id: doc.id, ...doc.data() }));
      setPredictions(p);
    }, (error) => console.error(error));

    return () => {
      unsubscribeMembers();
      unsubscribePredictions();
    };
  }, [bolaoId]);

  const rankedMembers = members.map(m => {
    let points = 0;
    let exatos = 0;
    predictions.filter(p => p.userId === m.userId).forEach(p => {
      const match = INITIAL_MATCHES.find(match => match.id === p.matchId);
      if (match && match.status === 'Finalizado') {
        const pred1 = Number(p.score1);
        const pred2 = Number(p.score2);
        const act1 = match.score1;
        const act2 = match.score2;
        
        if (pred1 === act1 && pred2 === act2) {
          points += 3;
          exatos += 1;
        } else if (
          (pred1 > pred2 && act1 > act2) || 
          (pred1 < pred2 && act1 < act2) || 
          (pred1 === pred2 && act1 === act2)
        ) {
          points += 1;
        }
      }
    });
    return { ...m, points, exatos };
  }).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.exatos - a.exatos;
  });

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      const batch = writeBatch(db);
      const inviteRef = doc(collection(db, 'invites'));
      
      batch.set(inviteRef, {
        bolaoId,
        bolaoName,
        email: inviteEmail,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      await batch.commit();
      setInviteEmail('');
      alert('Convite enviado com sucesso para ' + inviteEmail);
    } catch (err: any) {
      console.error(err);
      alert('Erro ao enviar convite: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-emerald-800 flex items-center gap-2">
          <Trophy size={20} className="text-emerald-600" />
          {bolaoName}
        </h3>
        <button onClick={onBack} className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition">Voltar</button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
            <Share2 size={16} /> Convidar via Email
          </h4>
          <form onSubmit={handleInvite} className="flex gap-2">
            <input 
              type="email" 
              placeholder="email@amigo.com" 
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              className="flex-1 border border-emerald-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <button 
              type="submit"
              className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition"
            >
              Enviar
            </button>
          </form>
        </div>
        
        <div className="sm:w-64 bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col justify-center items-center text-center">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1.5 text-sm">
            <Copy size={14} /> Compartilhar Link
          </h4>
          <p className="text-[10px] text-gray-500 mb-2">Envie o link do app para seus amigos.</p>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin);
              alert('Link copiado para a área de transferência!');
            }} 
            className="w-full bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-100 transition"
          >
            Copiar Link
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('ranking')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'ranking' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Ranking ({members.length})
        </button>
        <button 
          onClick={() => setActiveTab('my-predictions')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'my-predictions' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Meus Palpites
        </button>
        <button 
          onClick={() => setActiveTab('predictions')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'predictions' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Todos os Palpites
        </button>
      </div>

      {activeTab === 'ranking' && (
        <div className="space-y-3">
          {rankedMembers.map((m, index) => {
            const tiedWithAbove = index > 0 && m.points === rankedMembers[index - 1].points;
            const tiedWithBelow = index < rankedMembers.length - 1 && m.points === rankedMembers[index + 1].points;
            const isTied = tiedWithAbove || tiedWithBelow;

            return (
            <div key={m.id} className={`flex items-center justify-between p-4 rounded-xl border ${index === 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 text-center font-bold text-lg ${index === 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {index + 1}º
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm uppercase ${index === 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {m.email?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{m.email}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    {m.role === 'owner' && <span className="bg-gray-200 px-1.5 rounded text-[10px] uppercase font-bold">Admin</span>}
                    {predictions.filter(p => p.userId === m.userId).length} palpites
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-emerald-700">{m.points}</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">Pontos</div>
                {isTied && (
                  <div className="text-[10px] text-emerald-600 mt-1 font-semibold flex flex-col items-end">
                    <span className="flex items-center gap-1">Desempate: {m.exatos} cravados</span>
                  </div>
                )}
              </div>
            </div>
          )})}
        </div>
      )}

      {activeTab === 'my-predictions' && (
        <div>
          <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
            Preencha seus palpites para os jogos da Copa. Os palpites só podem ser alterados antes do início de cada partida.
          </div>
          {INITIAL_MATCHES.map(match => {
             const userPrediction = predictions.find(p => p.userId === auth.currentUser?.uid && p.matchId === match.id);
             return (
               <PredictionRow
                 key={match.id}
                 match={match}
                 userPrediction={userPrediction}
                 bolaoId={bolaoId}
                 userId={auth.currentUser?.uid || ''}
               />
             );
          })}
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="space-y-4">
          {predictions.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 border border-gray-100 border-dashed text-sm">
              Nenhum palpite foi registrado ainda neste bolão.
            </div>
          ) : (
            INITIAL_MATCHES.map(match => {
              const matchPredictions = predictions.filter(p => p.matchId === match.id);
              if (matchPredictions.length === 0) return null;
              
              return (
                <div key={match.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center text-sm font-semibold text-gray-700">
                    <div className="flex gap-2 items-center">
                      <CountryFlag code={match.flag1} />
                      {match.team1} <span className="text-gray-400 font-normal">x</span> {match.team2}
                      <CountryFlag code={match.flag2} />
                    </div>
                    {match.status === 'Finalizado' && (
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Placar: {match.score1} x {match.score2}</span>
                    )}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {matchPredictions.map(p => {
                      const member = members.find(m => m.userId === p.userId);
                      let pts = 0;
                      if (match.status === 'Finalizado') {
                        const pred1 = Number(p.score1);
                        const pred2 = Number(p.score2);
                        if (pred1 === match.score1 && pred2 === match.score2) pts = 3;
                        else if ((pred1 > pred2 && match.score1 > match.score2) || (pred1 < pred2 && match.score1 < match.score2) || (pred1 === pred2 && match.score1 === match.score2)) pts = 1;
                      }
                      
                      return (
                        <div key={p.id} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[10px] uppercase">
                              {member?.email?.charAt(0) || '?'}
                            </div>
                            <span className="text-sm text-gray-700 truncate max-w-[150px]">{member?.email || 'Desconhecido'}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                              <span>{p.score1}</span>
                              <span className="text-gray-400 font-normal text-xs">x</span>
                              <span>{p.score2}</span>
                            </div>
                            {match.status === 'Finalizado' && (
                              <span className={`text-xs font-bold w-10 text-right ${pts === 3 ? 'text-emerald-600' : pts === 1 ? 'text-amber-500' : 'text-gray-400'}`}>
                                +{pts} pts
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export function Bolao() {
  const [user, setUser] = useState(auth.currentUser);
  const [boloes, setBoloes] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [newBolaoName, setNewBolaoName] = useState('');
  const [selectedBolao, setSelectedBolao] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || !user.email) return;

    // Fetch pending invites
    const invitesRef = collection(db, 'invites');
    const invitesQ = query(invitesRef, where('email', '==', user.email), where('status', '==', 'pending'));
    const unsubscribeInvites = onSnapshot(invitesQ, (snapshot) => {
       const inv: any[] = [];
       snapshot.forEach(doc => inv.push({ id: doc.id, ...doc.data() }));
       setInvites(inv);
    });

    // We fetch any bolao where user is a member
    const boloesRef = collection(db, 'boloes');
    const q = query(boloesRef, where('memberIds', 'array-contains', user.uid));
    
    const unsubscribeBoloes = onSnapshot(q, (snapshot) => {
      const b: any[] = [];
      snapshot.forEach(doc => {
        b.push({ id: doc.id, ...doc.data() });
      });
      setBoloes(b);
    }, (error) => {
      console.error(error);
    });
    
    return () => {
      unsubscribeInvites();
      unsubscribeBoloes();
    };
  }, [user]);

  if (!user) {
    return <Auth onLogin={() => {}} />;
  }

  const handleAcceptInvite = async (invite: any) => {
    try {
      const batch = writeBatch(db);
      const inviteRef = doc(db, 'invites', invite.id);
      const bolaoRef = doc(db, 'boloes', invite.bolaoId);
      const memberRef = doc(db, 'boloes', invite.bolaoId, 'members', user.uid);
      
      batch.update(inviteRef, { status: 'accepted' });
      batch.update(bolaoRef, { memberIds: arrayUnion(user.uid) });
      batch.set(memberRef, { 
        userId: user.uid,
        email: user.email || 'unknown@example.com',
        role: 'member',
        joinedAt: serverTimestamp()
      });
      
      await batch.commit();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao aceitar convite: ' + err.message);
    }
  };

  const handleDeclineInvite = async (inviteId: string) => {
    try {
      await writeBatch(db).update(doc(db, 'invites', inviteId), { status: 'declined' }).commit();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao recusar convite: ' + err.message);
    }
  };

  const handleCreateBolao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBolaoName) return;
    try {
      const batch = writeBatch(db);
      const bolaoRef = doc(collection(db, 'boloes'));
      const memberRef = doc(db, 'boloes', bolaoRef.id, 'members', user.uid);

      batch.set(bolaoRef, {
        name: newBolaoName,
        ownerId: user.uid,
        memberIds: [user.uid],
        createdAt: serverTimestamp()
      });

      batch.set(memberRef, {
        userId: user.uid,
        email: user.email || 'unknown@example.com',
        role: 'owner',
        joinedAt: serverTimestamp()
      });

      await batch.commit();
      setNewBolaoName('');
    } catch (err: any) {
      console.error(err);
      alert('Error creating bolão: ' + err.message);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-lg font-bold text-gray-800">Meus Bolões</h2>
        <button 
          onClick={() => auth.signOut()}
          className="text-sm text-gray-500 hover:text-red-500 font-medium"
        >
          Sair
        </button>
      </div>

      {selectedBolao ? (
        <BolaoDetails 
          bolaoId={selectedBolao} 
          bolaoName={boloes.find(b => b.id === selectedBolao)?.name || 'Bolão'} 
          onBack={() => setSelectedBolao(null)} 
        />
      ) : (
        <>
          {invites.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="font-bold text-gray-800 px-1 text-sm uppercase tracking-wider">Convites Pendentes</h3>
              {invites.map(invite => (
                <div key={invite.id} className="bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-200 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">
                  <div>
                    <h4 className="font-bold text-emerald-900">{invite.bolaoName || 'Bolão'}</h4>
                    <p className="text-xs text-emerald-700">Você foi convidado a participar!</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAcceptInvite(invite)}
                      className="flex-1 sm:flex-none justify-center flex items-center gap-1 bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition"
                    >
                      <Check size={16} /> Aceitar
                    </button>
                    <button 
                      onClick={() => handleDeclineInvite(invite.id)}
                      className="flex-1 sm:flex-none justify-center flex items-center gap-1 bg-white text-gray-600 border border-emerald-200 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
                    >
                      <X size={16} /> Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <PlusCircle size={18} className="text-emerald-600" />
              Criar Novo Bolão
            </h3>
            <form onSubmit={handleCreateBolao} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Nome do seu bolão" 
                value={newBolaoName}
                onChange={e => setNewBolaoName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                maxLength={60}
              />
              <button 
                type="submit"
                className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800"
              >
                Criar
              </button>
            </form>
          </div>

          <div className="space-y-3">
            {boloes.map(bolao => (
              <div 
                key={bolao.id} 
                onClick={() => setSelectedBolao(bolao.id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:border-emerald-300 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{bolao.name}</h4>
                    <p className="text-xs text-gray-500">Toque para gerenciar</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
            
            {boloes.length === 0 && (
              <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 border border-gray-100 border-dashed text-sm">
                Você ainda não tem nenhum bolão. Crie um acima para convidar seus amigos!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
