import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeedbackModalProps {
  onClose: () => void;
}

export function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [type, setType] = useState<'suggestion' | 'bug' | 'other'>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('submitting');
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-emerald-50/30">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📝 Enviar Feedback
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center text-emerald-600"
            >
              <CheckCircle size={64} className="mb-4" />
              <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-600">Obrigado por nos ajudar a melhorar o Mundial 26.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Feedback
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('suggestion')}
                    className={`py-2 px-3 text-sm rounded-lg border font-medium transition-all ${
                      type === 'suggestion' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    💡 Sugestão
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('bug')}
                    className={`py-2 px-3 text-sm rounded-lg border font-medium transition-all ${
                      type === 'bug' 
                        ? 'bg-red-50 border-red-500 text-red-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    🐞 Bug / Erro
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('other')}
                    className={`py-2 px-3 text-sm rounded-lg border font-medium transition-all ${
                      type === 'other' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    💬 Outro
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Sua Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva sua sugestão ou o erro que encontrou..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none resize-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu E-mail (opcional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Para podermos responder..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || !message.trim()}
                  className="w-full py-3.5 px-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Enviar Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
