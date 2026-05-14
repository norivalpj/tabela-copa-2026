import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, Globe, Target, MapPin, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

interface LandingProps {
  onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-800">
          <Trophy size={28} className="fill-emerald-600" />
          <span className="text-2xl font-black tracking-tight">Mundial 26</span>
        </div>
        <button
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition font-semibold"
        >
          <Globe size={16} />
          <span className="text-sm uppercase tracking-wide">{lang}</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600 via-transparent to-transparent"></div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-wide mb-6">
            EUA • México • Canadá
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
            {t('landing_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('landing_subtitle')}
          </p>
          <button 
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-full text-lg font-bold hover:bg-emerald-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {t('enter_app')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t('landing_features')}</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto mt-4 rounded-full min-h-[4px]"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              className="flex flex-col items-center text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Calendar size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('landing_feature1_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing_feature1_desc')}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <Target size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('landing_feature2_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing_feature2_desc')}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MapPin size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('landing_feature3_title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing_feature3_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-emerald-900 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">{t('ready_for_kickoff')}</h2>
        <button 
          onClick={onEnter}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 rounded-full text-lg font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {t('enter_app')}
        </button>
      </section>
    </div>
  );
}
