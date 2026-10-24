import React from 'react';
import { Calculator, Atom, Code2, ArrowUpRight, Sparkles, Cpu, BookOpen } from 'lucide-react';
import { Subject } from '../types';

interface HeroSectionProps {
  counts: Record<Subject, number>;
  activeSubject: Subject | 'tutti';
  onSelectSubject: (sub: Subject | 'tutti') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  counts,
  activeSubject,
  onSelectSubject,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-14 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ScienzaLab Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs md:text-sm font-medium text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">ScienzaLab</span>
            <span className="text-slate-500">•</span>
            <span>Matematica, Scienze e Informatica</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
            <span>scienzalab.vercel.app</span>
          </div>
        </div>

        {/* Main Heading & Subtitle */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Officina <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300">ScienzaLab</span>:{' '}
            <span className="text-slate-100 font-extrabold block sm:inline">
              Matematica, Scienze e Informatica
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Una piattaforma didattica per esplorare, sperimentare e imparare attraverso simulatori interattivi,
            modelli scientifici, laboratori di logica e applicazioni web pronte all'uso per la scuola e il laboratorio.
          </p>
        </div>

        {/* 3 Pillar Subject Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {/* Card Matematica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'matematica' ? 'tutti' : 'matematica')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
              activeSubject === 'matematica'
                ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-indigo-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {counts.matematica} {counts.matematica === 1 ? 'risorsa' : 'risorse'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              <span>Matematica</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Geometria dinamica, teorema di Pitagora, frazioni visuali, algebra, probabilità e statistica.
            </p>
          </button>

          {/* Card Scienze */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'scienze' ? 'tutti' : 'scienze')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
              activeSubject === 'scienze'
                ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Atom className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {counts.scienze} {counts.scienze === 1 ? 'risorsa' : 'risorse'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              <span>Scienze</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Tavola periodica, sistema solare 3D, corpo umano, cellule, genetica mendeliana e simulazioni fisiche.
            </p>
          </button>

          {/* Card Informatica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'informatica' ? 'tutti' : 'informatica')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
              activeSubject === 'informatica'
                ? 'bg-cyan-950/70 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {counts.informatica} {counts.informatica === 1 ? 'risorsa' : 'risorse'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <span>Informatica</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Coding con Scratch, diagrammi di flusso, calcolo binario, circuiti booleani, Python e cyber security.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
