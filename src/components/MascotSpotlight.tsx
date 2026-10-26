import React, { useState } from 'react';
import {
  MASCOTS_DATA,
  Mascot,
  MascotId,
  PROF_SAURO_50_TIPS,
  PROF_IPAZIA_TIPS,
  PROF_ADA_TIPS,
} from '../data/mascots';
import { Subject } from '../types';
import { Sparkles, MessageSquare, Compass, ArrowRight, Lightbulb, GraduationCap, Dices, BookOpen, Code, Compass as CompassIcon } from 'lucide-react';

interface MascotSpotlightProps {
  onSelectSubject?: (subject: Subject | 'tutti') => void;
  activeSubject?: Subject | 'tutti';
}

export const MascotSpotlight: React.FC<MascotSpotlightProps> = ({
  onSelectSubject,
  activeSubject,
}) => {
  const [selectedMascotId, setSelectedMascotId] = useState<MascotId>('sauro');
  
  // Rotating tip indices for each professor
  const [sauroTipIndex, setSauroTipIndex] = useState(() => Math.floor(Math.random() * PROF_SAURO_50_TIPS.length));
  const [ipaziaTipIndex, setIpaziaTipIndex] = useState(() => Math.floor(Math.random() * PROF_IPAZIA_TIPS.length));
  const [adaTipIndex, setAdaTipIndex] = useState(() => Math.floor(Math.random() * PROF_ADA_TIPS.length));
  const [studentQuoteIndex, setStudentQuoteIndex] = useState(0);

  const currentMascot = MASCOTS_DATA.find((m) => m.id === selectedMascotId) || MASCOTS_DATA[0];

  const handleMascotSelect = (mascot: Mascot) => {
    setSelectedMascotId(mascot.id);
    if (mascot.id === 'sauro') {
      setSauroTipIndex((prev) => (prev + 1) % PROF_SAURO_50_TIPS.length);
    } else if (mascot.id === 'ipazia') {
      setIpaziaTipIndex((prev) => (prev + 1) % PROF_IPAZIA_TIPS.length);
    } else if (mascot.id === 'ada') {
      setAdaTipIndex((prev) => (prev + 1) % PROF_ADA_TIPS.length);
    } else {
      setStudentQuoteIndex(0);
    }
  };

  const handleNextTip = () => {
    if (selectedMascotId === 'sauro') {
      setSauroTipIndex((prev) => (prev + 1) % PROF_SAURO_50_TIPS.length);
    } else if (selectedMascotId === 'ipazia') {
      setIpaziaTipIndex((prev) => (prev + 1) % PROF_IPAZIA_TIPS.length);
    } else if (selectedMascotId === 'ada') {
      setAdaTipIndex((prev) => (prev + 1) % PROF_ADA_TIPS.length);
    } else {
      setStudentQuoteIndex((prev) => (prev + 1) % currentMascot.quotes.length);
    }
  };

  const handleRandomTip = () => {
    if (selectedMascotId === 'sauro') {
      setSauroTipIndex(Math.floor(Math.random() * PROF_SAURO_50_TIPS.length));
    } else if (selectedMascotId === 'ipazia') {
      setIpaziaTipIndex(Math.floor(Math.random() * PROF_IPAZIA_TIPS.length));
    } else if (selectedMascotId === 'ada') {
      setAdaTipIndex(Math.floor(Math.random() * PROF_ADA_TIPS.length));
    } else {
      setStudentQuoteIndex(Math.floor(Math.random() * currentMascot.quotes.length));
    }
  };

  // Determine current active tip/quote
  let activeText = '';
  let activeContext = '';
  let activeTipNumber = '';
  let activeCategoryBadge = '';

  if (selectedMascotId === 'sauro') {
    const tip = PROF_SAURO_50_TIPS[sauroTipIndex];
    activeText = tip.text;
    activeContext = `${tip.category} • ${tip.title}`;
    activeTipNumber = `Consiglio #${tip.id} di ${PROF_SAURO_50_TIPS.length} del Prof. Sauro`;
    activeCategoryBadge = tip.category;
  } else if (selectedMascotId === 'ipazia') {
    const tip = PROF_IPAZIA_TIPS[ipaziaTipIndex];
    activeText = tip.text;
    activeContext = `${tip.category} • ${tip.title}`;
    activeTipNumber = `Consiglio #${tip.id} di ${PROF_IPAZIA_TIPS.length} della Prof.ssa Ipazia`;
    activeCategoryBadge = tip.category;
  } else if (selectedMascotId === 'ada') {
    const tip = PROF_ADA_TIPS[adaTipIndex];
    activeText = tip.text;
    activeContext = `${tip.category} • ${tip.title}`;
    activeTipNumber = `Pillola #${tip.id} di ${PROF_ADA_TIPS.length} della Prof.ssa Ada`;
    activeCategoryBadge = tip.category;
  } else {
    const quote = currentMascot.quotes[studentQuoteIndex % currentMascot.quotes.length];
    activeText = quote.text;
    activeContext = quote.context;
    activeTipNumber = `Esperienza ${(studentQuoteIndex % currentMascot.quotes.length) + 1} di ${currentMascot.quotes.length} di ${currentMascot.name}`;
    activeCategoryBadge = currentMascot.preferredSubject.toUpperCase();
  }

  const isTeacher = currentMascot.isTeacher;

  return (
    <section className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-white">
                La Squadra di ScienzaLab
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3 Docenti & 2 Studenti
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Esplora i consigli didattici di Prof. Sauro (Scienze), Prof.ssa Ipazia (Matematica), Prof.ssa Ada (Informatica) e degli studenti Leo e Mia!
            </p>
          </div>
        </div>

        {/* Mascot switcher pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex-wrap">
          {MASCOTS_DATA.map((mascot) => {
            const isSelected = mascot.id === selectedMascotId;
            return (
              <button
                key={mascot.id}
                onClick={() => handleMascotSelect(mascot)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <img
                  src={mascot.avatar}
                  alt={mascot.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="whitespace-nowrap">{mascot.name}</span>
                {mascot.isTeacher && (
                  <span className="hidden xl:inline text-[9px] px-1 py-0.2 rounded bg-white/10 text-slate-300">
                    Prof
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mascot Card Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        {/* Mascot Character Avatar Box */}
        <div className="md:col-span-4 flex flex-col items-center text-center p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 group">
          <div className="relative mb-3">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 group-hover:scale-105 transition-transform duration-300 bg-slate-800">
              <img
                src={currentMascot.avatar}
                alt={currentMascot.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-900 border border-slate-700 text-cyan-300 shadow-md">
              {currentMascot.species}
            </span>
          </div>

          <h4 className="text-xl font-black text-white">{currentMascot.name}</h4>
          <span className="text-xs font-semibold text-emerald-400 mt-0.5">
            {currentMascot.role}
          </span>
          <p className="text-xs text-slate-400 italic mt-2 max-w-xs leading-relaxed">
            {currentMascot.tagline}
          </p>
        </div>

        {/* Mascot Speech Bubble & Interactive Tip */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
          {/* Speech Bubble */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{activeContext}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isTeacher && (
                  <button
                    onClick={handleRandomTip}
                    className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-colors inline-flex items-center gap-1"
                    title="Estrai un consiglio casuale"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>Casuale</span>
                  </button>
                )}
                <button
                  onClick={handleNextTip}
                  className="text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-750 transition-colors inline-flex items-center gap-1"
                  title="Leggi il suggerimento successivo"
                >
                  <span>Successivo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              "{activeText}"
            </blockquote>

            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{activeTipNumber}</span>
              </div>
              {activeCategoryBadge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeCategoryBadge}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions with Mascot */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">Ambito preferito:</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${currentMascot.badgeColor}`}>
                {currentMascot.preferredSubject === 'tutti'
                  ? 'Tutte le Scienze & STEAM'
                  : currentMascot.preferredSubject.toUpperCase()}
              </span>
            </div>

            {onSelectSubject && (
              <button
                onClick={() => onSelectSubject(currentMascot.preferredSubject)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950/50 transition-all hover:scale-[1.02]"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>
                  {currentMascot.preferredSubject === 'tutti'
                    ? 'Mostra tutte le attività'
                    : `Filtra sezione ${currentMascot.preferredSubject}`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

